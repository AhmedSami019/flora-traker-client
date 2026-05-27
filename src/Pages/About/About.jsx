import plant1 from "../../assets/about-plant1.png";
import plant2 from "../../assets/about-plant2.png";
const About = () => {
  return (
    <div className="space-y-10 px-3 md:px-10 mb-10">
      <h1 className="text-4xl text-center font-bold">
        Helping you grow green spaces with absolute peace of mind.
      </h1>
      <section className="flex flex-col-reverse md:flex-row gap-10">
        <div className="md:w-1/2 bg-white p-10 rounded-2xl space-y-6">
          <h3 className="text-2xl font-semibold">Why us</h3>
          <p className="text-justify">
            "Every great plant parent starts somewhere. For most of us, it
            starts with a beautifully vibrant houseplant that accidentally drops
            its leaves a few weeks later. We built Flora because we believe
            anyone can have a thriving indoor jungle—they just need the right
            routine. Flora is a lightweight digital gardening companion designed
            to eliminate the anxiety of plant parenting. By blending simple
            botanical data with clean tracking workflows, our application takes
            over the mental load of remembering watering days, misting
            frequencies, and fertilization cycles. We bridge the gap between
            technology and nature to keep your home space breathing, fresh, and
            beautifully alive."
          </p>
        </div>
        <div className="md:w-1/2 ">
          <img className="w-1/2 mx-auto" src={plant1} alt="" />
        </div>
      </section>
      {/* second section */}
      <section className="flex flex-col-reverse md:flex-row-reverse gap-10">
        <div className="md:w-1/2 bg-white p-10 rounded-2xl space-y-6">
          <h3 className="text-2xl font-semibold">Your Feature Highlights</h3>
          <p className="text-justify">
            🌱 Smart Care Routines: No more generic timers. Flora helps you
            structure care schedules tailored around the specific moisture,
            light, and seasonal demands of each unique species. <br /> 📅 Chronological
            Progress Logs: Build a visual timeline for every plant in your
            collection. Log leaves unfurling, propagation progress, repotting
            dates, and healthy milestone snapshots. <br />🔔 Zero-Stress
            Notifications: Get clear, actionable indicators telling you exactly
            when it's time to water, feed, or prune, so your plants never go
            thirsty or overlooked again. <br />🎨 Minimalist Dashboard: Designed to
            get out of your way. Your plants take center stage in a clean,
            intuitive UI that reflects the calm, natural spaces you are
            cultivating.
          </p>
        </div>
        <div className="md:w-1/2 ">
          <img className="w-1/2 mx-auto" src={plant2} alt="" />
        </div>
      </section>
    </div>
  );
};

export default About;
