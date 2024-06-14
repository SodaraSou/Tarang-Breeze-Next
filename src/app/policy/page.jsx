import { Card, CardHeader, CardContent } from "@/components/ui/card";
import UserLayout from "@/app/UserLayout";

function PolicyPage() {
  return (
    <UserLayout>
      <div className="px-4 md:px-10 md:pb-0 md:pt-10">
        <Card className="max-w-5xl mx-auto bg-white">
          <CardHeader>
            <h1 className="text-3xl font-bold text-center mb-2">
              Tarang Policy
            </h1>
            <p>
              Welcome to Tarang, your trusted platform for reservation sports
              venues. We are dedicated to making sports accessible, enjoyable,
              and inclusive for everyone. Please read our reservation policy
              carefully to ensure a smooth and enjoyable experience.
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div>
                <h1 className="text-2xl font-bold mb-2">
                  Reservation Guidelines
                </h1>
                <p>
                  <b>Advance Reservation Requirement:</b> To ensure the
                  availability of venues and adequate preparation time, all
                  reservations must be made at least 48 hours (2 days) before
                  the intended game day.
                </p>
                <p>
                  <b>Change Reservation Requirement:</b> Reservations can be
                  changed at least 24 hours (1 day) before the intended game
                  day. You need to contact the Tarang Admin for any change to
                  your reservation.
                </p>
                <p>
                  <b>Cancel Reservation Requirement:</b> Reservations can be
                  canceled at least 24 hours (1 day) notice before the intended
                  game day.
                </p>
                <p>
                  <b>On Call Reservation:</b> You can also reserved venue via
                  Tarang Social or Phone Call.
                </p>
              </div>
              <div>
                <h1 className="text-2xl font-bold mb-2">
                  Match Hosting Guidelines
                </h1>
                <p>
                  <b>For The Host:</b> You can create your match game when you
                  reserved the venue, but for on call reservation we will be
                  unable to host a match game for you. You can reject or accept
                  your opponent or cancel your match game in the Match Game
                  panel in your Profile. Any change to the match game you have
                  to notify Tarang atleast 24 hours (1 day) before the intended
                  game day.
                </p>
                <p>
                  <b>For The Challenger:</b> You can accept or withdraw your
                  match game in the Match Game panel in your Profile. Any change
                  to the match game you have to notify the Host atleast 24 hours
                  (1 day) before the intended game day. Tarang will not
                  responsible for any altercation between the Host and the
                  Challenger.
                </p>
              </div>
              <div>
                <h1 className="text-2xl font-bold mb-2">Code of Conduct</h1>
                <p>
                  <b>Respect and Fair Play:</b> All players and teams are
                  expected to adhere to principles of respect and fair play. Any
                  form of discrimination, harassment, or unsportsmanlike conduct
                  will not be tolerated and may result in a ban from using our
                  services.
                </p>
                <p>
                  <b>Venue Rules:</b> Please adhere to the rules and regulations
                  of the reserved venue. Failure to comply with venue rules may
                  result in penalties or additional charges.
                </p>
              </div>
              <div>
                <h1 className="text-2xl font-bold mb-2">Changes to Policy</h1>
                <p>
                  Tarang reserves the right to update or modify this reservation
                  policy at any time. Any changes will be communicated to users
                  via our social and updated on our website. Please review this
                  policy periodically to stay informed of any changes.
                </p>
              </div>
              <div className="mb-16">
                <h1 className="text-2xl font-bold mb-2">Contact Us</h1>
                <p>
                  If you have any questions or need assistance, please do not
                  hesitate to contact our support team at support@tarang.site or
                  call us at (123) 456-7890. We are here to help you with any
                  queries or concerns.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </UserLayout>
  );
}

export default PolicyPage;
