'use client';

import { motion } from 'framer-motion';

const avatarVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (index: number) => ({
    scale: 1,
    opacity: 1,
    transition: {
      delay: index * 0.1,
      duration: 0.4,
      ease: "backOut"
    }
  })
};

export function TrustBadge() {
  // Sample user avatar data
  const avatars = [
    { bg: "bg-blue-500", text: "S" },
    { bg: "bg-green-500", text: "M" },
    { bg: "bg-purple-500", text: "J" },
    { bg: "bg-orange-500", text: "A" },
    { bg: "bg-pink-500", text: "L" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="inline-flex items-center gap-3 bg-blue-50 border border-blue-100 rounded-full px-6 py-3"
    >
      
      {/* Avatar Stack */}
      <div className="flex -space-x-2">
        {avatars.map((avatar, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={avatarVariants}
            initial="hidden"
            animate="visible"
            className={`w-8 h-8 ${avatar.bg} rounded-full flex items-center justify-center text-white text-sm font-semibold border-2 border-white shadow-sm`}
          >
            {avatar.text}
          </motion.div>
        ))}
      </div>

      {/* Trust Text */}
      <motion.span
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="text-blue-700 font-medium text-sm"
      >
        Trusted by 100+ startup founders
      </motion.span>

    </motion.div>
  );
}