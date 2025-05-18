export default function AboutStudyVerse() {
    return (
        <>
            <h1 className="text-center font-bold text-2xl">
                How StudyVerse Helps You Excel?
            </h1>

            <div className=" space-y-6 md:flex md:space-x-5">
                <section className="bg-white rounded-xl shadow p-4 space-y-3">
                    <h2 className="font-bold text-xl">
                        Find Your Perfect Study Buddy
                    </h2>

                    <p>
                        connect with student whi share same subject, and preferred learning style.
                        collaborate effectively, motivate each other and conquer challenging topics together.
                        Our smart matching sytems helps you find the right parners quickly
                    </p>
                </section>

                <section className="bg-white rounded-xl shadow p-4 space-y-3">
                    <h2 className="font-bold text-xl">
                        Your Personal AI Tutor
                    </h2>

                    <p>
                        stuck on a concept? Need quick and Concise explanation or practice questions?
                        chat with our AI buddy, available 24/7 to support your learning journey, offering guidiance 
                        tailored to your subject of choice
                    </p>
                </section>
            </div>
        </>
    )
}