import Image from "next/image";

import { ProfileSettingsComponent } from "@/components/UI";
import { getCurrentUser } from "@/lib/session";
import { getUserProjects } from "@/lib/actions";
import { UserProfile } from "@/common.types";

const ProfileSettings = async () => {
  const session = await getCurrentUser();
  const user = session?.user;
  const result = await getUserProjects(user.id, 100) as { user: UserProfile }
  
  return (
    <section className='flexCenter flex-col max-w-10xl w-full mx-auto paddings'>
      <section className="flexCenter max-lg:flex-col gap-10 lg:w-2/5 md:w-2/3 w-full">
        <div className='flex items-center flex-col w-full'>
          <Image src={user?.avatarUrl} width={100} height={100} className="rounded-full" alt="user image" />
          <p className="text-4xl font-bold mt-10">{user?.name}</p>
          <ProfileSettingsComponent user={result?.user}/>
        </div>
      </section>
    </section>
  )
}

export default ProfileSettings