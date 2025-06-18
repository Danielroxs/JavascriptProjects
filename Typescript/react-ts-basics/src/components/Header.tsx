import type { FC, PropsWithChildren } from "react";

type HeaderProps = PropsWithChildren<{ src: string; alt: string }>;

const HeaderComponent: FC<HeaderProps> = ({ src, alt, children }) => {
  return (
    <div>
      <header>
        <img src={src} alt={alt} />
        {children}
      </header>
    </div>
  );
};

export default HeaderComponent;
