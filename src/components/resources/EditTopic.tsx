import React, { useEffect, useState } from "react";
import InputField from "../auth/InputField";
import Button from "../common/Button";
import ProgressIndicator from "../common/ProgressIndicator";
import { AiOutlineCheck } from "react-icons/ai";
import Editor from "../common/TextEditor";
import { useEditTopicMutation } from "<@>/store/resource/resource-api";

interface UpdateTopicsProps {
  onClose: () => void;
  topic: Topic;
}

const UpdateTopic: React.FC<UpdateTopicsProps> = ({
  onClose,
  topic: { id, title },
}) => {
  const [topic, setTopic] = useState({
    id: id,
    title: title,
  });
  const [topicError, setTopicError] = useState({
    title: "",
  });
  const handleChange = (e: any) => {
    setTopic({ ...topic, [e.target.name]: e.target.value });
  };

  let [updateTopic, { data, isSuccess, isError, isLoading, error }] =
    useEditTopicMutation();

  const updateError = error as any;
  const validTopic = () => {
    if (topic.title != "") {
      setTopicError({
        title: "",
      });
      updateTopic(topic);
    } else
      setTopicError({
        title: topic.title ? "" : "Please insert Topic title",
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
    <div className="w-[44rem] h-full p-2 flex flex-col gap-2">
      <p className="font-bold text-lg">Update topic</p>
      <p className="text-sm opacity-30">Easily update topics in the system.</p>

      <div>
        {error &&
          updateError.data?.error?.map((err: any, index: number) => {
            return <p className="text-xs text-red-500">{err.errorMessage}</p>;
          })}{" "}
        {error && !updateError.data && (
          <p className="text-xs text-red-500">Unknown Error</p>
        )}
      </div>

      <form className="flex flex-col gap-2 mb-4">
        <p className="text-xs text-red-500">
          {topicError.title !== "" && topicError.title}
        </p>

        <InputField
          label=""
          name="title"
          placeholder="Title"
          type="text"
          value={topic.title}
          onChange={handleChange}
        />
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
            onClick={() => validTopic()}
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
            onClick={() => validTopic()}
            className="font-medium"
            label="Update"
          ></Button>
        )}
      </div>
    </div>
  );
};

export default UpdateTopic;
