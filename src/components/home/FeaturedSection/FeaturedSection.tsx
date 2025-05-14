import Title from "@/components/ui/Title";

const FeaturesSection = () => {
  const features = [
    {
      icon: "🔒",
      title: "100% Secure Payments",
      description:
        "Your transactions are protected with end-to-end encryption.",
      bgColor: "bg-primary",
      textWhite: true,
    },
    {
      icon: "🎧",
      title: "24/7 Support Center",
      description:
        "Chat, email, or call us anytime. Our experts are here to help you.",
    },
    {
      icon: "💵",
      title: "TrustPay Guarantee",
      description:
        "Receive your product or get your money back, no questions asked.",
    },
    {
      icon: "🚚",
      title: "Worldwide Shipping",
      description:
        "Fast and reliable delivery in over 200 countries and regions.",
    },
    {
      icon: "💰",
      title: "Best Price Promise",
      description:
        "We offer competitive pricing with unbeatable value and savings.",
    },
    {
      icon: "🎁",
      title: "Gift Cards",
      description:
        "Give the perfect gift with personalized e-gift cards and vouchers.",
    },
    {
      icon: "🔄",
      title: "Easy Returns",
      description:
        "Not satisfied? Return the product within 14 days with free pickup.",
    },
    {
      icon: "📦",
      title: "Fast Dispatch",
      description: "Most orders ship within 24 hours from our local warehouse.",
    },
    {
      icon: "📱",
      title: "Mobile Shopping",
      description: "Seamlessly browse and shop from our iOS & Android apps.",
    },
    {
      icon: "✅",
      title: "Verified Quality",
      description:
        "Every product goes through rigorous quality checks before shipping.",
      bgColor: "bg-secondary",
      textWhite: true,
    },
  ];

  return (
    <div className="my-12">
      <Title word_1="Our" word_2="Services" />
      <p className="text-center font-madimi text-gray-600 mb-8 px-6 sm:px-16 md:px-28 lg:px-48 font-medium">
        Explore our exceptional customer-focused features designed to make your
        shopping experience smooth, secure, and satisfying. Whether it's fast
        delivery, easy returns, or 24/7 support we've got you covered.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-6 sm:px-10 font-madimi">
        {features.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col items-center justify-center text-center p-6 border rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-gray-200 ${
              item.bgColor || "bg-white"
            } ${item.textWhite ? "text-white" : "text-gray-800"}`}
          >
            <div className="text-4xl mb-4">{item.icon}</div>
            <h3 className="font-semibold text-sm uppercase mb-2 tracking-wide">
              {item.title}
            </h3>
            <p className="text-xs leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
