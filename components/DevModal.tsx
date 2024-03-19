'use client';

import { isProduction } from '@/lib/env';
import clsx from 'clsx';
import React, { useState, useEffect } from 'react';

const navLinks: Array<{ title: string; href: string }> = [
  { title: 'Home', href: '/home' },
  { title: 'Blog', href: '/blog' },
  { title: 'Rewards', href: '/active-staker-reward-pool' },
  { title: 'Roadmap', href: '/roadmap' },
  { title: 'FAQ', href: '/faq' },
];

// Simple Modal Component for demonstration
const Modal = ({
  isOpen,
  onClose,
  children,
  className,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={clsx(
        'fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center',
        isOpen ? '' : 'hidden'
      )}
      onClick={onClose}
    >
      <div
        className={clsx('bg-gray-950 p-8 rounded-lg shadow-lg', className)}
        onClick={event => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

// Main Component that listens for Ctrl+K
export const DevModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = event => {
      // Check for Ctrl+K (event.code === 'KeyK' for cross-browser compatibility)
      if (event.ctrlKey && event.code === 'KeyK') {
        event.preventDefault(); // Prevent the default action to ensure it doesn't interfere with other shortcuts
        setIsModalOpen(prev => !prev);
      } else if (event.code === 'Escape') {
        setIsModalOpen(false);
      }
    };

    // Add event listener
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (isProduction()) {
    return null;
  }

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <nav>
          <ul>
            {navLinks.map(({ title, href }) => (
              <li key={href}>
                <a href={href}>{title}</a>
              </li>
            ))}
          </ul>
        </nav>
      </Modal>
      {/* Your other components go here */}
    </>
  );
};
