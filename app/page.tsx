import { ProjectSearch } from "@/common.types";
import { Categories, Pagination } from "@/components/UI";
import { Projects } from "@/components/sections";
import { fetchAllProjects } from '@/lib/actions';

type SearchParams = {
  category?: string | null;
  endcursor?: string | null;
}

type Props = {
  searchParams: SearchParams
}

const Home = async ({ searchParams: { category, endcursor } }: Props) => {
  const data = await fetchAllProjects(category, endcursor) as ProjectSearch;
  const paginationOptions = data?.projectSearch?.pageInfo;
  data?.projectSearch?.pageInfo
  return (
    <section className="flex-start flex-col paddings mb-16">
      <Categories />

      <Projects projects={data}/>

      <Pagination 
        startCursor={paginationOptions?.startCursor} 
        endCursor={paginationOptions?.endCursor} 
        hasPreviousPage={paginationOptions?.hasPreviousPage} 
        hasNextPage={paginationOptions?.hasNextPage}
      />
    </section>
  )
}

export default Home;