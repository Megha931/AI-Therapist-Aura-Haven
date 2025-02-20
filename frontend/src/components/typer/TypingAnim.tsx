import { TypeAnimation } from "react-type-animation";

const TypingAnim = () => {
  return (
    <TypeAnimation
      sequence={[
        "Welcome to a space of clarity and calm. ",
        2000,
        "Your thoughts, your emotions—understood, not judged.",
        2500,
        "Reflection begins with a single moment of stillness.",
        2500,
        "Let’s navigate your journey, one thought at a time.",
        2500,
        "You are heard. You are valued. You are not alone.",
        3000,
      ]}
      speed={55}
      style={{
        fontSize: "50px", // ✅ Classy, professional size
        color: "white",
        display: "inline-block",
        textShadow: "2px 2px 15px rgba(0, 0, 0, 0.7)", // ✅ Subtle, refined glow
        fontWeight: "500",
        textAlign: "center",
        paddingTop: "250px",
      }}
      repeat={Infinity}
    />
  );
};

export default TypingAnim;
