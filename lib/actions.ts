import { GraphQLClient } from "graphql-request";

import { createProjectMutation, createUserMutation, deleteProjectMutation, updateProjectMutation, getProjectByIdQuery, getProjectsOfUserQuery, getUserQuery, projectsQuery, updateUserMutation } from "@/graphql";
import { ProjectForm } from "@/common.types";
import { apiUrl, serverUrl, apiKey } from "@/constants/globals";
import { isBase64DataURL, uploadImage } from "@/utils";
import { categoryFilters } from "@/constants";

const client = new GraphQLClient(apiUrl);

export const fetchToken = async () => {
  try {
    const response = await fetch(`${serverUrl}/api/auth/token`);
    return response.json();
  } catch (err) {
    throw err;
  }
};

const makeGraphQLRequest = async (query: string, variables = {}) => {
  try {
    return await client.request(query, variables);
  } catch (err) {
    throw err;
  }
};

export const fetchAllProjects = (category?: string | null, endcursor?: string | null) => {
  client.setHeader("x-api-key", apiKey);
  const categories = category == null ? categoryFilters : [category];
  return makeGraphQLRequest(projectsQuery, { categories, endcursor });
};

export const createNewProject = async (form: ProjectForm, creatorId: string, token: string) => {
  const imageUrl = await uploadImage(form.image);
  if (imageUrl.url) {
    client.setHeader("Authorization", `Bearer ${token}`);
    const variables = {
      input: { 
        ...form, 
        image: imageUrl.url, 
        createdBy: { 
          link: creatorId 
        }
      }
    };
    return makeGraphQLRequest(createProjectMutation, variables);
  }
};

export const updateProject = async (form: ProjectForm, projectId: string, token: string) => {
  let updatedForm = { ...form };
  const isUploadingNewImage = isBase64DataURL(form.image);
  if (isUploadingNewImage) {
    const imageUrl = await uploadImage(form.image);
    if (imageUrl.url) {
      updatedForm = { ...updatedForm, image: imageUrl.url };
    }
  }
  client.setHeader("Authorization", `Bearer ${token}`);
  const variables = {
    id: projectId,
    input: updatedForm,
  };
  return makeGraphQLRequest(updateProjectMutation, variables);
};

export const updateUserAbout = async (form: { description: string }, userId: string, token: string) => {
  client.setHeader("Authorization", `Bearer ${token}`);
  const variables = {
    id: userId,
    newDesc: form.description,
  };
  return makeGraphQLRequest(updateUserMutation, variables);
};

export const deleteProject = (id: string, token: string) => {
  client.setHeader("Authorization", `Bearer ${token}`);
  return makeGraphQLRequest(deleteProjectMutation, { id });
};

export const getProjectDetails = (id: string) => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(getProjectByIdQuery, { id });
};

export const createUser = (name: string, email: string, avatarUrl: string) => {
  client.setHeader("x-api-key", apiKey);

  const variables = {
    input: {
      name: name,
      email: email,
      avatarUrl: avatarUrl
    },
  };
  
  return makeGraphQLRequest(createUserMutation, variables);
};

export const getUserProjects = (id: string, last?: number) => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(getProjectsOfUserQuery, { id, last });
};

export const getUser = (email: string) => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(getUserQuery, { email });
};