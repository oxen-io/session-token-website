'use client';

import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

const navLinks: Array<{ title: string; href: string }> = [
  { title: 'Home', href: '/home' },
  { title: 'Coming Soon', href: '/coming-soon' },
  { title: 'Blog', href: '/blog' },
  { title: 'Rewards', href: '/active-staker-reward-pool' },
  { title: 'Roadmap', href: '/roadmap' },
  { title: 'FAQ', href: '/faq' },
] as const;

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
      role="dialog"
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

export const DevModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastSearchChar, setLastSearchChar] = useState<string>('');
  const [lastSearchIndex, setLastSearchIndex] = useState<number>(0);

  useEffect(() => {
    const handleKeyDown = event => {
      // Checks for the ctrl + k key combination
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        setIsModalOpen(prev => !prev);
      } else if (event.code === 'Escape') {
        setIsModalOpen(false);
      } else {
        setLastSearchChar(event.key);
        const matchingLinks = navLinks.filter(
          ({ title }) => title.toLowerCase().charAt(0) === event.key
        );
        if (matchingLinks.length > 0) {
          let targetIndex = lastSearchIndex;
          if (event.key === lastSearchChar) {
            if (targetIndex < matchingLinks.length - 1) {
              targetIndex++;
            } else {
              targetIndex = 0;
            }
          }
          if (targetIndex > matchingLinks.length) {
            return;
          }
          setLastSearchIndex(targetIndex);

          const link = matchingLinks[targetIndex];
          if (link) {
            const anchor = document.querySelector(
              `a[aria-label="dev-nav${link.href}"]`
            ) as HTMLAnchorElement;
            anchor.focus();
          }
        }
      }
    };

    // Add event listener
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [lastSearchChar, lastSearchIndex]);

  return (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <nav>
        <ul>
          {navLinks.map(({ title, href }, i) => (
            <li key={href}>
              <a tabIndex={i} href={href} aria-label={`dev-nav${href}`}>
                {title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </Modal>
  );
};
