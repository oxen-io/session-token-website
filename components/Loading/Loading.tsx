import './loading.css';

export const Loading = () => {
  return (
    <div className="align-center flex h-screen w-screen items-center justify-center">
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
