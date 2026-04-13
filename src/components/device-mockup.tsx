import Image from "next/image";

type DeviceMockupProps = {
  alt: string;
  className?: string;
  src: string;
  type?: "phone" | "browser";
};

export function DeviceMockup({
  alt,
  className = "",
  src,
  type = "phone",
}: DeviceMockupProps) {
  return (
    <div className={`device-mockup device-mockup-${type} ${className}`.trim()}>
      {type === "phone" ? (
        <>
          <div className="device-phone-speaker" aria-hidden="true" />
          <div className="device-phone-button" aria-hidden="true" />
        </>
      ) : (
        <div className="device-browser-bar" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      )}
      <div className="device-screen">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={type === "phone" ? "(min-width: 1100px) 18vw, 70vw" : "(min-width: 1100px) 34vw, 92vw"}
          className="device-screen-image"
        />
      </div>
    </div>
  );
}
