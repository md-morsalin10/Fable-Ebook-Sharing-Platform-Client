"use client";
import React, { useState } from 'react';
import EditProfileModal from './EditProfileModal';

export default function EditProfileButton({ user, className, label }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsModalOpen(true)}
        className={className}
      >
        {label}
      </button>

      <EditProfileModal 
        user={user}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
