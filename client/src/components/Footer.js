import React from 'react';
import GitHubButton from 'react-github-btn';

const Footer = () => {
  return (
    <div className="Footer">
      <div className="text">
        Made with{' '}
        <span role="img" aria-label="f" aria-labelledby="f">
          💖
        </span>{' '}
        by <a href="/">Team Hack Overflow</a>
      </div>

      <span className="margin-left">
        <GitHubButton
          href="https://github.com/radioactive11/HealthBridge"
          data-icon="octicon-star"
          data-size="large"
          aria-label="Star radioactive11/HealthBridge on GitHub"
        >
          Star
        </GitHubButton>
      </span>

      <span className="margin-left text">or</span>

      <span className="margin-left">
        <GitHubButton
          href="https://github.com/radioactive11/HealthBridge/fork"
          data-icon="octicon-repo-forked"
          data-size="large"
          aria-label="Fork radioactive11/HealthBridge on GitHub"
        >
          Fork
        </GitHubButton>
      </span>
    </div>
  );
};

export default Footer;
