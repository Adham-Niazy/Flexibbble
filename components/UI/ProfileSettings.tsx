"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { Button } from "@/components/UI";
import { FormField } from '../Forms';
import { UserProfile } from '@/common.types';
import { fetchToken, updateUserAbout } from '@/lib/actions';

const ProfileSettings = ({ user }: { user: UserProfile }) => {
  const router = useRouter()
  const [userAbout, setUserAbout] = useState(user.description || 'I’m a Software Engineer 👋');
  const [submitting, setSubmitting] = useState(false);

  const handleEditDescription = async () => {
    if (userAbout?.length <= 3) {
      toast.error("Description must be more than 3 chars!");
      return;
    }
    setSubmitting(true)
    const { token } = await fetchToken()
    try {
      await updateUserAbout({
        description: userAbout!
      }, user?.id as string, token)
      router.push(`/profile/${user?.id}`);
    toast.success("Congratulations! 🎉🎊, You have updated your ABOUT.")
  } catch (error) {
    toast.error(`Failed to edit your description. Try again!`);
  } finally {
    setSubmitting(false);
  }
}
return (
  <>
    <div className='mt-4'></div>
    <FormField
      title='Your Description'
      state={userAbout}
      placeholder="Showcase and discover remarkable developer projects."
      isTextArea
      setState={(value) => setUserAbout(value)}
    />
    {/* <p className="md:text-5xl text-3xl font-extrabold md:mt-10 mt-5 max-w-lg">I’m Frontend Engineer at Mazaj. 👋</p> */}

    <div className="flex mt-8 gap-5">
      <Button title="Save" submitting={submitting} handleClick={handleEditDescription} />
    </div>
  </>
)
}

export default ProfileSettings