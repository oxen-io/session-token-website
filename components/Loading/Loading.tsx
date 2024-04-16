import './loading.css';

export const Loading = () => {
  return (
    <div className="flex align-center justify-center w-screen h-screen items-center">
      <div>
        <div className="lds-roller">
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    </div>
  );
};
