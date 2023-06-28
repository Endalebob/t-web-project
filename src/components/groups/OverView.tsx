import React from "react";
// import CardProps from "../../types/group/overview"
import { PiStudentFill } from "react-icons/pi";
import { MdGroups2 } from 'react-icons/md';
import OverViewCard, { CardProps } from "../common/OverViewCard";


const GroupOverViewData: CardProps[] = [
{
    icon: PiStudentFill,
    title: "Total Students",
    number: 182,
  },
  {
    icon: MdGroups2,
    title: "Total Groups",
    number: 5,
  },
  {
    icon: PiStudentFill,
    title: "Mean Group Size",
    number: 2,
  },
];



const GroupOverView: React.FC = () => {
    return ( 
        <div className="font-semibold text-lg text-seconday-text text-left p-8"><h1 className="pl-8">Overview</h1>
        <div className="flex flex-row flex-wrap">
            {GroupOverViewData.map((data, index) => (
        <div key={index} className="ml-4 sm:ml-6 mt-4">
          <OverViewCard
            icon={data.icon}
            title={data.title}
            number={data.number}
          />
        </div>
      ))}
    </div>
</div>
     );
}
 
export default GroupOverView;