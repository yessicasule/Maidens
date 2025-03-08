import { motion } from 'framer-motion';

const Home = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-center text-white p-8 bg-white bg-opacity-10 backdrop-blur-md rounded-2xl shadow-lg"
            >
                <h1 className="text-5xl font-bold mb-4">Welcome to NoMaien</h1>
                <p className="text-lg">Your gateway to innovation and technology</p>
            </motion.div>
        </div>
    );
};

export default Home;
