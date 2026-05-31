import { campaignOne } from "@/content/campaign-one";

import styles from "./mobile-home-page.module.css";

const testimonialSpotlight = campaignOne.testimonials.items[0];
const compactTestimonials = campaignOne.testimonials.items.slice(1);
const mobileTestimonialRows = [0, 1].map((rowIndex) =>
  compactTestimonials.filter((_, testimonialIndex) => testimonialIndex % 2 === rowIndex),
);

type MobileTestimonialsSectionProps = {
  headingId?: string;
};

export function MobileTestimonialsSection({
  headingId = "mobile-promotions-testimonials-heading",
}: MobileTestimonialsSectionProps) {
  return (
    <section className={styles.campaignTestimonials} aria-labelledby={headingId}>
      <p className={styles.newsKicker}>{campaignOne.testimonials.eyebrow}</p>
      <h2 id={headingId} className={styles.sectionTitle}>
        {campaignOne.testimonials.heading}
      </h2>
      <figure className={styles.testimonialSpotlight}>
        <blockquote>{testimonialSpotlight.quote}</blockquote>
        <figcaption>
          <strong>{testimonialSpotlight.name}</strong>
          <span>{testimonialSpotlight.role}</span>
        </figcaption>
      </figure>
      <div className={styles.testimonialOrbit} aria-label="More testimonial excerpts">
        {mobileTestimonialRows.map((row, rowIndex) => (
          <div key={`mobile-testimonial-row-${rowIndex}`} className={styles.testimonialLane}>
            <div className={styles.testimonialTrack}>
              {row.map((testimonial) => (
                <figure key={testimonial.name} className={styles.testimonialTile}>
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
                  className={styles.testimonialTile}
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
    </section>
  );
}
