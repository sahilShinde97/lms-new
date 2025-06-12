import React from "react";

const Testimonials = () => {
  const testimonialsData = [
    {
      id: 1,
      name: "John Doe",
      position: "Student",
      message:
        "This platform helped me learn so effectively. The courses are amazing and the instructors are top-notch.",
      image:
        "https://th.bing.com/th?q=Current+Bachelor&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247",
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "Student",
      message:
        "I've learned more here than in any other place. The interactive lessons and quizzes make learning enjoyable.",
      image:
        "https://th.bing.com/th/id/OIP.GKAiW3oc2TWXVEeZAzrWOAHaJF?w=135&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    {
      id: 3,
      name: "John Doe",
      position: "Student",
      message:
        "This platform helped me learn so effectively. The courses are amazing and the instructors are top-notch.",
      image:
        "https://th.bing.com/th?q=Current+Bachelor&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247",
    },
    {
      id: 4,
      name: "Jane Smith",
      position: "Student",
      message:
        "I've learned more here than in any other place. The interactive lessons and quizzes make learning enjoyable.",
      image:
        "https://th.bing.com/th/id/OIP.GKAiW3oc2TWXVEeZAzrWOAHaJF?w=135&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
  ];
  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 via-white to-yellow-50">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-purple-700 mb-12 drop-shadow">
        What our students say
      </h2>
      <div className="flex flex-wrap justify-center gap-8">
        {testimonialsData.map((e) => (
          <div
            key={e.id}
            className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl w-[320px] p-7 flex flex-col items-center border border-purple-100 hover:scale-105 hover:shadow-2xl transition-all duration-300"
          >
            <img
              src={e.image}
              alt={e.name}
              className="w-20 h-20 rounded-full object-cover border-4 border-purple-200 shadow mb-4"
            />
            <p className="text-gray-700 text-base italic mb-4 text-center">
              “{e.message}”
            </p>
            <div className="text-center">
              <p className="text-lg font-bold text-purple-700">{e.name}</p>
              <p className="text-sm text-gray-500">{e.position}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;