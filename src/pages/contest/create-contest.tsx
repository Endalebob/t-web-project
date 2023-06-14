import React, { useState } from "react";
import { useCreateContestMutation } from "<@>/store/contest/contest-api";

const ContestForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date | null>(new Date());
  const [time, setTime] = useState("");
  const [link, setLink] = useState("");
  const [dateError, setDateError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [timeError, setTimeError] = useState("");
  const [linkError, setLinkError] = useState("");

  const [createContest, { isLoading }] = useCreateContestMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title) {
      setTitleError("Please enter a title");
      return;
    }

    if (!description) {
      setDescriptionError("Please enter a description");
      return;
    }

    if (!date) {
      setDateError("Please enter a date");
      return;
    }

    if (!time) {
      setTimeError("Please enter a time");
      return;
    }

    if (!link) {
      setLinkError("Please enter a link");
      return;
    }

    try {
      const contest = {
        title,
        description,
        date,
        time,
        link,
      };
      await createContest(contest).unwrap();
      console.log(contest);
      // Contest creation successful, reset form fields
      setTitle("");
      setDescription("");
      setDate(new Date());
      setTime("");
      setLink("");
    } catch (error) {
      // Handle contest creation error
      alert("An error occurred while creating the contest");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-1/2 mx-auto mt-8 h-full">
      <div>
        <h1 className="pt-4 pb-8 text-2xl text-secondary-text font-semibold">
          Create Contest
        </h1>
      </div>
      <div className="mb-8">
        <label htmlFor="title" className="block mb-2 font-semibold">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded h-8 focus:outline-none"
        />
        {titleError && <p className="text-red-500">{titleError}</p>}
      </div>
      <div className="mb-8">
        <label htmlFor="description" className="block mb-2 font-semibold">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
        ></textarea>
        {descriptionError && <p className="text-red-500">{descriptionError}</p>}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="mb-8 col-span-1">
          <label htmlFor="date" className="block mb-2 font-semibold">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date instanceof Date ? date.toISOString().split("T")[0] : ""}
            onChange={(e) => setDate(e.target.valueAsDate)}
            className="w-full p-2 border rounded focus:outline-none"
            placeholder="6/8/2023"
          />
          {dateError && <p className="text-red-500">{dateError}</p>}
        </div>
        <div className="mb-8 col-span-1">
          <label htmlFor="time" className="block mb-2 font-semibold">
            Time
          </label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none"
            placeholder="08:00"
          />
          {timeError && <p className="text-red-500">{timeError}</p>}
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="link" className="block mb-2 font-semibold">
          Link
        </label>
        <input
          type="text"
          id="link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="w-full p-2 border rounded h-8 focus:outline-none"
        />
        {linkError && <p className="text-red-500">{dateError}</p>}
      </div>
      <div>
        <div className="border h-0 mt-12 mb-4"></div>
      </div>
      <div className="grid justify-items-end">
        <div>
          <button className="font-semibold mr-4 py-2 text-lg">Cancel</button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-1 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600 text-lg"
          >
            {isLoading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ContestForm;
