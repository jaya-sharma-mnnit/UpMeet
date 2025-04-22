"use client";


import { useGetCallById } from "@/lib/useGetCallById";
import { useUser } from "@/lib/useUser";
import { useToast } from "@/providers/toastProvider";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";



const Table = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col items-start gap-2 xl:flex-row">
      <h1 className="text-base font-medium text-sky-1 lg:text-xl xl:min-w-32">
        {title}:
      </h1>
      <h1 className="truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl">
        {description}
      </h1>
    </div>
  );
};

const PersonalRoom = () => {
  const router = useRouter();
  const { user } = useUser();
  const client = useStreamVideoClient();
  const { addToast } = useToast();

  const meetingId = user?._id;

  const { call } = useGetCallById(meetingId);

  const startRoom = async () => {
    if (!client || !user || !meetingId) return;
    console.log('start Room')
   
    
      const newCall = client.call("default", meetingId!);

      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        },
      });
    

    router.push(`/meeting/${meetingId}?personal=true`);
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`;

  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <h1 className="text-xl font-bold lg:text-3xl">Personal Meeting Room</h1>
      <div className="flex w-full flex-col gap-8 xl:max-w-[900px]">
        <Table title="Topic" description={`${user?.username}'s Meeting Room`} />
        <Table title="Meeting ID" description={meetingId!} />
        <Table title="Invite Link" description={meetingLink} />
      </div>
      <div className="flex gap-5">
        <button className="bg-blue-1" onClick={startRoom}>
          Start Meeting
        </button>
        <button
          className="bg-dark-3"
          onClick={() => {
            navigator.clipboard.writeText(meetingLink);
            
          }}
        >
          Copy Invitation
        </button>
      </div>
    </section>
  );
};

export default PersonalRoom;