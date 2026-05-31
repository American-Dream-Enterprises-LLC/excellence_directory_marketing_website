import { campaignOne } from "@/content/campaign-one";

const testimonialSpotlight = campaignOne.testimonials.items[0];
const testimonialRows = [0, 1, 2].map((rowIndex) =>
  campaignOne.testimonials.items.filter((_, testimonialIndex) => testimonialIndex % 3 === rowIndex),
);

type DesktopTestimonialsSectionProps = {
  headingId?: string;
};

export function DesktopTestimonialsSection({
  headingId = "campaign-one-testimonials-heading",
}: DesktopTestimonialsSectionProps) {
  return (
    <section className="campaign-one-testimonials-section" aria-labelledby={headingId}>
      <div className="campaign-one-testimonials-heading">
        <p className="home-news-kicker">{campaignOne.testimonials.eyebrow}</p>
        <h2 id={headingId}>{campaignOne.testimonials.heading}</h2>
        <p>{campaignOne.testimonials.body}</p>
      </div>
      <div className="campaign-one-testimonials-stage">
        <figure className="campaign-one-testimonial-spotlight">
          <blockquote>{testimonialSpotlight.quote}</blockquote>
          <figcaption>
            <strong>{testimonialSpotlight.name}</strong>
            <span>{testimonialSpotlight.role}</span>
          </figcaption>
        </figure>
        <div className="campaign-one-testimonial-orbit" aria-label="All testimonial excerpts">
          {testimonialRows.map((row, rowIndex) => (
            <div key={`testimonial-row-${rowIndex}`} className="campaign-one-testimonial-lane">
              <div className="campaign-one-testimonial-track">
                {row.map((testimonial) => (
                  <figure key={testimonial.name} className="campaign-one-testimonial-tile">
                    <blockquote>{testimonial.quote}</blockquote>
                    <figcaption>
                      <strong>{testimonial.name}</strong>
                      <span>{testimonial.role}</span>
                    </figcaption>
                  </figure>
                ))}
                {row.map((testimonial) => (
                  <figure
                    key={`${testimonial.name}-repeat`}
                    className="campaign-one-testimonial-tile"
                    aria-hidden="true"
                  >
                    <blockquote>{testimonial.quote}</blockquote>
                    <figcaption>
                      <strong>{testimonial.name}</strong>
                      <span>{testimonial.role}</span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
