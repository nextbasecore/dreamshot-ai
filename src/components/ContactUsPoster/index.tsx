import ContactUsForm from "./ContactUsForm";

export default function ContactUsPoster() {
    return (
        <div className="w-full h-full mb-15" style={{
            backgroundImage: 'url(/assets/cloud-background.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }}>
            {/* Title and Description */}
            <div className="flex flex-col text-center items-center gap-3 justify-center pt-15 px-4">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold px-4">
                    We’d Love to Hear From You
                </h1>
                <p className=" text-gray-500 max-w-xl">We’re here to answer your questions and provide support. Prefer email? Contact us
                    directly at <span className="text-primary font-bold">contact@dreamshot.art </span></p>
            </div>

            <div className="flex flex-col pb-15 md:flex-row lg:flex-row items-center gap-5 justify-center w-full max-w-6xl mx-auto px-4 mt-10">
                <ContactUsForm />
                <img 
                        src="/assets/ContactUs/Background.png" 
                        alt="Contact Us Poster" 
                        className="w-full object-contain h-full max-w-[318px] lg:max-w-[388px]" 
                    />
            </div>

        </div>
    )
}
