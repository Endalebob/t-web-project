import React, { useEffect, useState } from "react";
import Button from "../common/Button";
import InputField from "../auth/InputField";
import { useUpdateAnnouncementMutation } from "<@>/store/announcement/announcement-api";
import ProgressIndicator from "../common/ProgressIndicator";
import { AiOutlineCheck } from "react-icons/ai";
import { Announcement } from "<@>/types/admin/Announcement";
import Editor from "../common/TextEditor";

interface EditAnnouncementProps {
  onClose: () => void;
  announcement: Announcement;
}
const EditAnnouncement: React.FC<EditAnnouncementProps> = ({
  onClose,
  announcement: { id, title, description },
}) => {
  const [announcement, setAnnouncement] = useState({
    id,
    title,
    description,
  });
  const [announcementError, setAnnouncementError] = useState({
    title: "",
    description: "",
  });
  const handleChange = (e: any) => {
    setAnnouncement({ ...announcement, [e.target.name]: e.target.value });
  };

  const [updateAnnouncement, { data, isSuccess, isError, isLoading, error }] =
    useUpdateAnnouncementMutation();
  const editError = error as any;
  const validAnnouncement = () => {
    if (announcement.title != "" && announcement.description != "") {
      setAnnouncementError({
        title: "",
        description: "",
      });
      updateAnnouncement(announcement);
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
      <p className="font-bold text-lg">Edit announcement</p>
      <div>
        {editError &&
          editError.data?.error?.map((err: any, index: number) => {
            return <p className="text-xs text-red-500">{err.errorMessage}</p>;
          })}{" "}
        {error && !editError.data && (
          <p className="text-xs text-red-500">Unknown Error</p>
        )}
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
        <Editor
          value={announcement.description}
          setValue={(value: string) =>
            setAnnouncement({ ...announcement, description: value })
          }
        />
        <p className="text-xs text-red-500">
          {announcementError.description !== "" &&
            announcementError.description}
        </p>
      </form>

      <div className="flex justify-end gap-2">
        <Button
          onClick={() => onClose()}
          className=" bg-secondary !text-gray-800 font-medium "
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
            label="Update"
          ></Button>
        )}
      </div>
    </div>
  );
};

export default EditAnnouncement;
