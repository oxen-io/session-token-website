'use client';

import { getEnvironment } from '@/lib/env';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

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
        'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50',
        isOpen ? '' : 'hidden'
      )}
      role="dialog"
      onClick={onClose}
    >
      <div
        className={clsx('rounded-lg bg-gray-950 p-8 shadow-lg', className)}
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export const DevModal = ({ slugs }: { slugs: Array<string> }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastSearchChar, setLastSearchChar] = useState<string>('');
  const [lastSearchIndex, setLastSearchIndex] = useState<number>(0);

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Checks for the ctrl + k key combination
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        setIsModalOpen((prev) => !prev);
      } else if (event.code === 'Escape') {
        setIsModalOpen(false);
      } else {
        setLastSearchChar(event.key);
        const matchingLinks = slugs.filter((slug) => slug.toLowerCase().charAt(0) === event.key);
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
              `a[aria-label="dev-nav-${link}"]`
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
  }, [lastSearchChar, lastSearchIndex, slugs]);

  return (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <div>
        Environment: {getEnvironment()}
        <nav>
          <ul>
            {slugs.map((slug, i) => (
              <li key={slug}>
                <a tabIndex={i} href={`${slug}`} aria-label={`dev-nav-${slug}`}>
                  {slug}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </Modal>
  );
};
