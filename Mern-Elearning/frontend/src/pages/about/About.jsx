import React from "react";

const About = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-purple-100 via-white to-yellow-50 py-16 px-4">
      <div className="relative bg-white rounded-3xl shadow-2xl p-10 max-w-2xl w-full border border-purple-100 overflow-hidden">
        {/* Decorative background dots */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
          <svg width="100%" height="100%">
            <circle cx="30" cy="30" r="2" fill="#a78bfa" />
            <circle cx="80" cy="80" r="2" fill="#fbbf24" />
            <circle cx="200" cy="120" r="2" fill="#a78bfa" />
            <circle cx="300" cy="60" r="2" fill="#fbbf24" />
            <circle cx="400" cy="200" r="2" fill="#a78bfa" />
          </svg>
        </div>
        {/* Big greeting */}
        <div className="text-5xl md:text-6xl font-extrabold text-center mb-4 bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg">
          नमस्कार!
        </div>
   
        <div className="h-1 w-24 mx-auto bg-gradient-to-r from-purple-500 via-pink-400 to-yellow-300 rounded-full mb-6" />
        <p className="mb-4 text-gray-700 text-lg">
          <strong>मी वैष्णवी शिंदे</strong>, डिजिटल मार्केटिंगच्या दुनियेत तुमचं स्वागत करते. मी <strong>"डिजिटल सेल्स डॉमिनेटर"</strong> आणि <strong>"डिजिटल मेल डॉमिनन्स"</strong> या प्लॅटफॉर्म्सच्या माध्यमातून मराठी भाषेत उत्तम आणि परिणामकारक डिजिटल कोर्सेस उपलब्ध करून देत आहे.
        </p>
        <ul className="list-disc list-inside mb-4 text-gray-700 pl-2 space-y-1">
          <li>सोशल मीडियाचा प्रभावी वापर</li>
          <li>ऑनलाइन ब्रँड बिल्डिंग</li>
          <li>डिजिटल मार्केटिंगचे मूलभूत व प्रगत तंत्र</li>
          <li>सेल्स स्ट्रॅटेजीज आणि कंवर्शन टेक्निक्स</li>
        </ul>
        <p className="mb-2 text-gray-700 text-lg">
          माझं उद्दिष्ट एकच — <strong>मराठी तरुणांना आणि उद्योजकांना डिजिटल युगात सक्षम बनवणं</strong>.
        </p>
        <p className="mb-4 text-gray-700 text-lg">
          जर तुम्ही तुमचा व्यवसाय ऑनलाईन वाढवू इच्छित असाल, किंवा डिजिटल करिअरमध्ये यशस्वी व्हायचं स्वप्न पाहत असाल, तर हे कोर्सेस तुमच्यासाठीच आहेत.
        </p>
        <em className="block text-center text-purple-600 font-semibold text-xl mt-8">
          आपली भाषा, आपली शिकवण, आपलं यश – चला एकत्र डिजिटल डॉमिनन्सकडे!
        </em>
      </div>
    </div>
  );
};

export default About;