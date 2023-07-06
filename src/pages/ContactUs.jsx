import { motion } from "framer-motion";

const ContactUs = () => {
  const people = [
    {
      name: "Pierre Bonnet",
      role: "Team Leader / Web3 Developer",
      imageUrl:
        "https://media.licdn.com/dms/image/C4E03AQGKYX92yxcmvg/profile-displayphoto-shrink_400_400/0/1654793351986?e=1691020800&v=beta&t=RgOyPTG0reEXAvtCRoCBafFgVWWwuzGibuSu330Dvos",
      linkedin: "https://www.linkedin.com/in/pierre-bonnet-efrei/",
    },
    {
      name: "Enrique Carretero",
      role: "Web3 Developer",
      imageUrl:
        "https://media.licdn.com/dms/image/C4E03AQEwst02FtORTw/profile-displayphoto-shrink_100_100/0/1648558757551?e=1691020800&v=beta&t=lgnnZxbqSq7_hxP86ItR3x3H7pvwASkYfUmiKzpCFUQ",
      linkedin: "https://www.linkedin.com/in/enrique-carretero-2a48a21a6/",
    },
    {
      name: "Adrien Benoit",
      role: "Front Developer",
      imageUrl:
        "https://media.licdn.com/dms/image/D4E03AQHg-N_VnZtMSA/profile-displayphoto-shrink_400_400/0/1686139623064?e=1694044800&v=beta&t=QIj6HfRgM78hG4DB9Vh90J2yJ0-J7UaqwGH_UrJW1u0",
      linkedin: "https://www.linkedin.com/in/adrien-benoit-6999191a0/",
    },
    {
      name: "Mathieu Roger",
      role: "Front Developer",
      imageUrl:
        "https://media.licdn.com/dms/image/D4E03AQGEYrhfVLvCeg/profile-displayphoto-shrink_100_100/0/1672828820073?e=1691020800&v=beta&t=vKVGOwP9uYaUcA9oJ8Sf7ErMQHhsqRTWfU6RKg_9oWk",
      linkedin: "https://www.linkedin.com/in/mathieu-roger-aa70b5178/",
    },
    {
      name: "Clément Debrosse",
      role: "Backend Developer",
      imageUrl:
        "https://media.licdn.com/dms/image/C4E03AQGeU8HV9mIp0g/profile-displayphoto-shrink_100_100/0/1655551235536?e=1691020800&v=beta&t=vv8-6bxMkHA41lPWBFiBProrAEDzswqf_IvoBPDE6TY",
      linkedin: "https://www.linkedin.com/in/cl%C3%A9ment-debrosse-4489261a0/",
    },
    {
      name: "Alexandre Delfosse",
      role: "Database Administrator",
      imageUrl:
        "https://media.licdn.com/dms/image/C4E03AQGGArLuJ7_dAg/profile-displayphoto-shrink_100_100/0/1663514068151?e=1691020800&v=beta&t=8ojTesycsj0YAsqopZ3yxl3_xV1SXbCiZ2P7v49qpNk",
      linkedin: "https://www.linkedin.com/in/alexandre-delfosse-87a9ba19b/",
    },
    {
      name: "Jean Toscanelli",
      role: "Competitive & Financial Analyst",
      imageUrl:
        "    https://media.licdn.com/dms/image/C4E03AQHQsmMAo-xqlA/profile-displayphoto-shrink_400_400/0/1656089347897?e=1691020800&v=beta&t=vagwpAw1aYWqcBiwVB6nA8S9RQMaGNn73yZJLTQxE3I",
      linkedin: "https://www.linkedin.com/in/jean-toscanelli-2216731a1/",
    },
    {
      name: "Adrien Barcelere",
      role: "Customer & Marketing Manager",
      imageUrl:
        "https://media.licdn.com/dms/image/C4E03AQECOjoMzD0K2w/profile-displayphoto-shrink_100_100/0/1656593140883?e=1691020800&v=beta&t=H53QSUz6YLlnNTRPnrhUN8C3hl_TdWnV3IXRuW47jjM",
      linkedin: "https://www.linkedin.com/in/adrien-barcel%C3%A8re-9024bb192/",
    },
  ];
  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="mt-2 text-4xl font-bold text-gray-300">
        Meet our leadership
      </h2>
      <p className="mt-6 text-justify text-gray-200 text-xl">
        Our motivated team is driven by passion, collaboration, and a shared
        vision, inspiring each other to achieve greatness.
      </p>

      <ul role="list" className="flex flex-wrap w-3/4 items-center mt-8">
        {people.map((person, index) => (
          <motion.div
            className="w-1/2 mt-5"
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -200 : 200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <li className="flex flex-col items-center ">
              <a href={person.linkedin} target="_blank">
                <img
                  className="h-28 w-28 rounded-full hover:scale-105 transition duration-300 ease-in-out"
                  src={person.imageUrl}
                />
              </a>

              <h3 className="font-semibold text-white">{person.name}</h3>
              <p className="text-justify font-semibold text-indigo-400 ">
                {person.role}
              </p>
            </li>
          </motion.div>
        ))}
      </ul>
    </div>
  );
};

export default ContactUs;
