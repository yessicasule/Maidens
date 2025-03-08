import { motion } from "framer-motion";
const Button = ({ children, className }) => (
    <button className={`px-6 py-3 rounded-lg text-lg shadow-lg transition ${className}`}>
      {children}
    </button>
  );
  

export default function Home() {
    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* Background Story Video */}
            <video
                autoPlay
                loop
                muted
                className="absolute inset-0 w-full h-full object-cover"
            >
                <source src="/assets/story.mp4" type="video/mp4" />
            </video>

            {/* Overlay Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-50">
                <motion.h1
                    className="text-5xl font-bold mb-4 text-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Welcome to the Galactic Code Academy 🚀
                </motion.h1>

                <motion.p
                    className="text-lg text-center max-w-2xl mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    Embark on an interstellar journey where coding unlocks the mysteries of the universe. Solve challenges, explore planets, and become a master cadet in the Galactic Code Academy!
                </motion.p>

                <Button className="bg-yellow-400 text-black px-6 py-3 rounded-lg text-lg shadow-lg hover:bg-yellow-300 transition">
                    Get Started
                </Button>
            </div>
        </div>
    );
}
