import React, { useEffect, useState } from "react";
import InputField from "../auth/InputField";
import Button from "../common/Button";
import { useCreateAnnouncementMutation } from "<@>/store/announcement/announcement-api";
import ProgressIndicator from "../auth/ProgressIndicator";
import { AiOutlineCheck } from "react-icons/ai";

interface CreateAnnouncementProps {
  onClose: () => void;
}
const CreateAnnouncement: React.FC<CreateAnnouncementProps> = ({ onClose }) => {
  const [announcement, setAnnouncement] = useState({
    title: "",
    description: "",
  });
  const [announcementError, setAnnouncementError] = useState({
    title: "",
    description: "",
  });
  const handleChange = (e: any) => {
    setAnnouncement({ ...announcement, [e.target.name]: e.target.value });
  };

  let [createAnnouncement, { data, isSuccess, isError, isLoading, error }] =
    useCreateAnnouncementMutation();

  const createError = error as any;
  const validAnnouncement = () => {
    if (announcement.title != "" && announcement.description != "") {
      setAnnouncementError({
        title: "",
        description: "",
      });
      createAnnouncement(announcement);
    } else
      setAnnouncementError({
        title: announcement.title ? "" : "Please insert Announcement title",
        description: announcement.description
          ? ""
          : "please add announcement description",
      });
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isSuccess) {
      intervalId = setInterval(onClose, 1000);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isSuccess]);
  return (
    <div className="w-full h-full p-2 flex flex-col gap-2">
      <p className="font-bold text-lg">Create new Announcement</p>
      <p className="text-sm opacity-30">
        Add new Announcement to the system and easily get everyone up to speed.
      </p>

      <div>
        {error &&
          createError.data.error.map((err: any, index: number) => {
            return <p className="text-xs text-red-500">{err.errorMessage}</p>;
          })}{" "}
      </div>

      <form className="flex flex-col gap-2">
        <InputField
          label=""
          name="title"
          placeholder="Title"
          type="text"
          value={announcement.title}
          onChange={handleChange}
        />
        <p className="text-xs text-red-500">
          {announcementError.title !== "" && announcementError.title}
        </p>
        <textarea
          name="description"
          placeholder="content"
          value={announcement.description}
          onChange={handleChange}
          rows={10}
          cols={130}
          className="border rounded-md py-1 px-3 border-gray-300 placeholder-white-400"
        />
        <p className="text-xs text-red-500">
          {announcementError.description !== "" &&
            announcementError.description}
        </p>
        <p className="text-sm opacity-30">Markdown Supported</p>
      </form>

      <div className="flex justify-end gap-2">
        <Button
          onClick={() => onClose()}
          className="bg-secondary text-[#000000] font-medium"
          label="Cancel"
        ></Button>

        {isLoading ? (
          <Button
            startIcon={<ProgressIndicator size={5}></ProgressIndicator>}
            label=""
          ></Button>
        ) : isError ? (
          <Button
            onClick={() => validAnnouncement()}
            className="font-medium"
            label="Retry"
          ></Button>
        ) : isSuccess ? (
          <Button
            startIcon={<AiOutlineCheck></AiOutlineCheck>}
            label=""
          ></Button>
        ) : (
          <Button
            onClick={() => validAnnouncement()}
            className="font-medium"
            label="Create"
          ></Button>
        )}
      </div>
    </div>
  );
};

export default CreateAnnouncement;
