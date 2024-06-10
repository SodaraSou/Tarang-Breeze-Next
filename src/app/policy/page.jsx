import UserLayout from "@/app/UserLayout";
import React from "react";

function PolicyPage() {
  return (
    <UserLayout>
      <div className="max-w-7xl mx-auto my-16">
        <h1 className="text-3xl font-bold text-center">Tarang Policy</h1>
        <p className="mt-4 mb-16">
          Welcome to Tarang, your trusted platform for booking sports venues. We
          are dedicated to making sports accessible, enjoyable, and inclusive
          for everyone. Please read our booking policy carefully to ensure a
          smooth and enjoyable experience.
        </p>
        <div className="bg-gray-200 h-0.5"></div>
        <div className="flex flex-col gap-10 my-16">
          <div>
            <h1 className="text-2xl font-bold mb-2">Booking Guidelines</h1>
            <p>
              <b>Advance Booking Requirement:</b> To ensure the availability of
              venues and adequate preparation time, all bookings must be made at
              least two days before the intended game day. This allows us to
              confirm your reservation and ensure that the venue meets your
              needs.
            </p>
            <p>
              <b>Venue Availability:</b> Our platform provides real-time updates
              on venue availability. Once your booking is confirmed, you will
              receive a confirmation email with all the necessary details.
            </p>
            <p>
              <b>Booking Confirmation:</b> A booking is only confirmed once you
              receive a confirmation email from Tarang. Please ensure all
              details are accurate and inform us immediately if any changes are
              required.
            </p>
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-2">Team Matching Service</h1>
            <p>
              <b>Find a Team to Play Against:</b> If you're looking for a team
              to compete against, Tarang offers a team matching service. Simply
              let us know your preferences and skill level, and we will help
              connect you with an appropriate team.
            </p>
            <p>
              <b>Team Availability:</b> While we strive to find the best
              matches, team availability is subject to scheduling and demand. We
              recommend booking early and providing detailed preferences to
              increase the chances of a good match.
            </p>
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-2">Code of Conduct</h1>
            <p>
              <b>Respect and Fair Play:</b> All players and teams are expected
              to adhere to principles of respect and fair play. Any form of
              discrimination, harassment, or unsportsmanlike conduct will not be
              tolerated and may result in a ban from using our services.
            </p>
            <p>
              <b>Venue Rules:</b> Please adhere to the rules and regulations of
              the booked venue. Failure to comply with venue rules may result in
              penalties or additional charges.
            </p>
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-2">Changes to Policy</h1>
            <p>
              Tarang reserves the right to update or modify this booking policy
              at any time. Any changes will be communicated to users via email
              and updated on our website. Please review this policy periodically
              to stay informed of any changes.
            </p>
          </div>
          <div className="mb-16">
            <h1 className="text-2xl font-bold mb-2">Contact Us</h1>
            <p>
              If you have any questions or need assistance, please do not
              hesitate to contact our support team at support@tarang.com or call
              us at (123) 456-7890. We are here to help you with any queries or
              concerns.
            </p>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}

export default PolicyPage;
