import React from 'react';

import { sanityFetch } from './sanity.fetch';

export const blocksToText = (blocks, opts = {}) => {
  const defaults = { nonTextBehavior: 'remove' };

  const options = { ...defaults, ...opts };
  return blocks
    .map(block => {
      if (block._type !== 'block' || !block.children) {
        return options.nonTextBehavior === 'remove' ? '' : `[${block._type} block]`;
      }

      return block.children.map(child => child.text).join('');
    })
    .join('\n\n');
};

export const nl2p = (str, asString) => {
  if (!str) {
    return str;
  }

  const lines = str.split('\n').filter(Boolean);

  if (asString) {
    return lines.map(item => `<p>${item}</p>`).join('');
  }

  return lines.map((item, key) => <p key={key}>{item}</p>);
};

export const nl2br = (str, asString) => {
  if (!str) {
    return str;
  }

  const lines = str.split('\n').filter(Boolean);

  if (asString) {
    return lines
      .map((item, index) => {
        const isLast = index === lines.length - 1;

        return `${item}${isLast ? '' : '<br />'}`;
      })
      .join('');
  }

  return lines.map((item, key) => {
    const isLast = key === lines.length - 1;

    return (
      <React.Fragment key={key}>
        {item}
        {isLast ? '' : <br />}
      </React.Fragment>
    );
  });
};

export const replaceEmailWithMailToLinks = str => {
  if (!str) {
    return str;
  }

  return str.replace(/([^\s]+@[^\s]+)/g, '<a href="mailto:$1">$1</a>');
};

export const getSettings = async () => {
  return sanityFetch({
    query: `*[_type == "settings"][0] {
    ...,
    menuItems[]->{
      _type,
      "slug": slug.current,
      title,
      children[]->{
        _type,
        "slug": slug.current,
        title,
        overview,
      }
    },
  }`,
    tags: ['settings'],
  });
};

export const animateInProps = (delay, duration = 0.4) => ({
  initial: { opacity: 0 },
  whileInView: {
    opacity: 1,
  },
  viewport: {
    once: true,
  },
  transition: {
    duration,
    delay,
    ease: [0.25, 0.1, 0.25, 1],
  },
});
