import React, { useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Subscribe from "../../Components/Subscribe";
import FaqBannner from "../../Components/FaqBanner";

const TermsOfUse = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  const accordionData = [
    {
      title: "MarketBase+ Access",
      content: (
        <>
          <p class="mb-2">
            Subject to payment of the applicable Subscription Fee for the
            relevant part of the Subscription Period, IncNet authorises you to
            access and use MarketBase+ and Outputs you generate from that
            authorised use, only:
          </p>
          <p class="mb-2">
            Bus Mate takes reasonable steps to ensure individuals listed in the
            database are aware of its identity, the purpose of collection and
            possible use of their personal information and, to the extent
            practicable, obtains consent to such use.
          </p>
          <p class="mb-2">
            <br />

            <ul>
              <li className="mb-2">
                in accordance with the entitlements, limits and exclusions of
                your Subscription Tier;
                <br />
              </li>
              <li className="mb-2">
                via the number of Authorised Users permitted for your
                Subscription Tier; <br />
              </li>
              <li className="mb-2">
                during the pre-paid Subscription Period; <br />
              </li>
              <li className="mb-2">
                Ultimate Parent Company Name <br />
              </li>{" "}
              <br />
              <li className="mb-2">
                for your legitimate, lawful internal business purposes; and{" "}
                <br />
              </li>
              <li className="mb-2">
                in accordance with these terms. <br />
              </li>
            </ul>
          </p>
          <p class="mb-2">
            Your authorisation to use MarketBase+ and Outputs does not extend to
            any third party or your related bodies corporate, unless otherwise
            agreed by IncNet in writing.
          </p>
        </>
      ),
    },
    {
      title: "Authorised User Credentials",
      content: (
        <>
          <p class="mb-2">
            You are solely responsible for the security of your Authorised
            Users’ access credentials for MarketBase+ (“Credentials”) and all
            activity undertaken using them. You must ensure that Credentials
            allocated to an Authorised User are used only by that Authorised
            User, kept confidential and not shared between individuals. You must
            immediately notify IncNet if you become aware of any unauthorised
            use or access of MarketBase+ or Credentials, or have reason to
            believe the security or confidentiality of any Credentials have been
            compromised. IncNet may deactivate or reset accounts and passwords
            at its discretion to protect the security of MarketBase+ (and any
            user accounts).
          </p>
        </>
      ),
    },
    {
      title: "Audit",
      content: (
        <>
          <p class="mb-2">
            IncNet has the right to audit, monitor and verify (including via
            electronic means) your use of MarketBase+ to check your compliance
            with these terms. You must cooperate with IncNet and provide any
            reasonably required assistance in relation to such audit or
            verification, including (without limitation) by making relevant
            records available and requiring Authorised Users and your other
            agents and employees, to cooperate with IncNet. If you have used
            MarketBase+ in excess of your entitlements or in breach of these
            terms, you must, on demand, pay to IncNet additional applicable
            Subscription Fees and IncNet’s reasonable expenses.
          </p>
        </>
      ),
    },
    {
      title: "Confidential and Proprietary",
      content: (
        <>
          <p>
            IncNet owns and reserves all Intellectual Property Rights and other
            rights in MarketBase+ and the software, information, databases and
            data comprising it, as well as all of its Outputs and MarketBase+
            product documentation (“MarketBase+ Materials”) except to the extent
            access and licence rights are expressly granted to you under these
            terms. MarketBase+ Materials are IncNet’s confidential and
            proprietary material, and you must not disclose them to any third
            party.
          </p>
        </>
      ),
    },
    {
      title: "Prohibited Use",
      content: (
        <>
          <p>
            You must not do, permit or attempt any of the following, except as
            permitted in writing by IncNet:
            <ul>
              <li className="mb-2">
                sublicence, lease, sell, transfer or assign your rights to use
                MarketBase+ or Outputs;
              </li>
              <li className="mb-2">
                use, copy or recreate any part of MarketBase+ or Outputs other
                than as specifically authorised under these terms;
              </li>
              <li className="mb-2">
                reverse engineer, decompile, disassemble, translate or modify
                MarketBase+ in any way;
              </li>
              <li className="mb-2">
                bypass or avoid any security device or measure implemented in
                connection with MarketBase+;
              </li>
              <li className="mb-2">
                use MarketBase+ or Outputs in connection with the establishment,
                development or maintenance of any database, product, service,
                website, publication or other material which is similar to or
                derives any commercial benefit from MarketBase+ or Outputs
                (other than maintaining your own internal databases as permitted
                by these terms), or for any commercial publications; or
              </li>
              <li className="mb-2">
                use MarketBase+ or Outputs for data or database service
                provision.
              </li>
              <li className="mb-2">
                use MarketBase+ or Outputs for the benefit of a third party;
              </li>
            </ul>
          </p>
        </>
      ),
    },
    {
      title: "Fees, Terms, and Renewal",
      content: (
        <>
          <ul>
            <li class="mb-3">
              All Subscription Fees are payable online and in advance via the
              online payment method(s) made available by IncNet. IncNet will not
              provide or continue your MarketBase+ access unless full payment of
              the Subscription Fee is received.
              <li class="mb-3">
                {" "}
                Your Subscription continues initially for the pre-paid
                Subscription period you selected and paid for at the time of
                purchase. At the end of that initial period and any subsequent
                renewal period(s), your Subscription automatically renews for
                successive periods of the same duration as the initial
                Subscription Period, at the then-current applicable Subscription
                Fee notified by IncNet. However, either party may notify the
                other party at least 14 days before the end of the then-current
                Subscription Period of its election to cancel the Subscription,
                in which case the Subscription will not automatically renew.
              </li>
              <li class="mb-3">
                A party may terminate these terms (and your Subscription) if the
                other party commits a material breach of these terms which, if
                capable of remedy, is not rectified or remedied within 14 days
                of a notice requiring such action. If IncNet exercises this
                right, you will not be entitled to a refund of pre-paid
                Subscription Fees. If you validly exercise this right, you will
                receive, on request, a pro-rata refund of pre-paid Subscription
                Fees based on the unexpired portion of your pre-paid
                Subscription Period.
              </li>
              <li class="mb-3">
                {" "}
                You may cease using MarketBase+ or terminate these terms (and
                your Subscription) for convenience by notice in writing to
                MarketBase+ in your discretion and at any time, but you will not
                be entitled to any refund of pre-paid Subscription Fees.
              </li>
              <li class="mb-3">
                You are solely responsible for paying all taxes imposed on or
                applicable to the transactions contemplated by these terms.
              </li>
              <li class="mb-3">
                {" "}
                At the end of the Subscription Period: (a) your right to use
                MarketBase+ and Outputs terminates; and (b) you must delete or
                otherwise permanently destroy and remove from your systems and
                databases any Outputs (except that if, during the Subscription
                Period, an individual has expressly notified you that they wish
                to continue receiving information or communications from you,
                then you may retain that individual’s business contact
                information after the Subscription Period).
              </li>
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "Limited Warranties",
      content: (
        <>
          <ul>
            <li class="mb-3">
              IncNet warrants that MarketBase+ will perform substantially in
              accordance with its published documentation. If MarketBase+ does
              not so perform, you must notify IncNet and provide all reasonable
              details of the alleged defect in writing, within a reasonable time
              (generally, no longer than 30 days). You must also provide all
              further information reasonably requested by IncNet to enable it to
              investigate your notification. IncNet will investigate the alleged
              defect and, within a reasonable time, either: (a) repair
              MarketBase+; or (b) terminate your Subscription to MarketBase+ and
              issue a pro-rata refund of your pre-paid Subscription Fee (based
              on the unexpired portion of your pre-paid Subscription Period).
              This constitutes IncNet’s total liability and your sole and
              exclusive remedy for a breach of the warranty given in this
              clause.
              <li class="mb-3">
                IncNet obtains Outputs from sources it believes to be reliable
                and uses reasonable efforts to regularly verify the accuracy and
                completeness of the Outputs generated by MarketBase+. However,
                information and accuracy may change during the Subscription
                Period and diminish over time. You must treat Output which was
                not recently retrieved from MarketBase+ with additional caution.
                IncNet does not warrant that MarketBase+ or Outputs are error
                free, accurate, constantly available or available without
                interruption; they are provided “as-is” and “as-available”.
                IncNet does not warrant that the Outputs or MarketBase+ are
                suitable for your specific intended uses or that they will
                achieve your desired results, or that their use will produce any
                particular results.
              </li>
              <li class="mb-3">
                IncNet excludes, to the maximum extent permitted by law, all
                warranties (express or implied) not set out expressly in these
                terms, other than those which are not permitted by law to be
                limited or excluded (including those guarantees under the
                Australian Consumer Law in Schedule 2 of the Competition and
                Consumer Act 2010 (Cth) which cannot, by law, be excluded). With
                respect to any such non-excludable warranty or guarantee,
                IncNet’s liability is limited, to the extent permitted by law,
                to: (a) the re-supply of the affected goods or services; or (b)
                the cost of having the goods or services supplied again.
              </li>
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "Exclusions of Damages; Limitation of Liability",
      content: (
        <>
          <ul>
            <li class="mb-3">
              You are solely responsible for your use of MarketBase+ and
              Outputs, and IncNet is not liable for any claim against you
              arising from your use of MarketBase+ or Outputs (except as set out
              in these terms).
              <li class="mb-3">
                Consequential Loss. To the extent permitted by law, neither
                party is liable for any indirect, consequential, special,
                incidental or punitive loss or damages (whether arising in tort,
                including negligence, contract, under indemnity, under statute
                or otherwise), even if informed of the possibility of such loss
                or damages.
              </li>
              <li class="mb-3">
                Each party’s aggregate liability in connection with these terms,
                MarketBase+, Outputs and your Subscription (and any claims
                arising from them) is limited to the Subscription Fees you have
                paid to IncNet during the initial or renewed Subscription Period
                during which the claim arose, subject to this clause. The
                limitation on liability in this clause does not apply to: (i)
                IncNet’s indemnity obligations under clause 9.4; (ii) your
                indemnity obligations under clause 9.5; (iii) your obligation to
                pay Subscription Fees; or (iv) your infringement of IncNet’s
                Intellectual Property Rights or your use of MarketBase+ or
                Outputs in breach of these terms. To the extent permitted by
                law, neither party is liable to the other in respect of any
                claims brought more than 12 months after the cause of action
                arose.
              </li>
              <li class="mb-3">
                {" "}
                IncNet Indemnity. IncNet will indemnify you against any third
                party claim made against you based on the allegation that your
                use of MarketBase+ in accordance with these terms infringes the
                Intellectual Property Rights of that third party. In the event
                of such a claim you must provide IncNet:
                <ul>
                  <li class="mb-3">prompt written notice of the claim;</li>
                  <li class="mb-3">
                    {" "}
                    the sole right to control, defend and/or settle the claim
                    (at IncNet’s own cost); and
                  </li>
                  <li class="mb-3">
                    {" "}
                    all reasonable cooperation, information and assistance
                    requested by IncNet. In the event of such a claim, you must
                    also immediately cease using MarketBase+ or any part of it
                    giving rise to the claim (as instructed by IncNet), and
                    IncNet may, at its election: (a) modify MarketBase+ so as to
                    remove the infringement; (b) obtain rights for you to
                    continue using MarketBase+; or (c) terminate your
                    subscription and issue a pro-rata refund of pre-paid
                    Subscription Fees (based on the unexpired portion of the
                    then-current pre-paid Subscription Period). IncNet’s
                    obligations under this clause do not apply where the claim
                    is based on or caused by: (i) your combination of
                    MarketBase+ or Outputs with services, products or
                    information not supplied by IncNet; (ii) your use of
                    Outputs, which is your sole responsibility; (iii) your
                    modification of MarketBase+ or Outputs; or (iv) your use of
                    MarketBase+ or Outputs other than as authorised under these
                    terms, or your breach of these terms. This clause 9.4 sets
                    out your sole and exclusive remedies with respect to any
                    claim of Intellectual Property Rights infringement arising
                    from your use of MarketBase+.
                  </li>
                </ul>
              </li>
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "General",
      content: (
        <>
          <ul>
            <li class="mb-3">
              Obligations that by their nature are continuing, will survive
              termination or expiry of these terms. Without limitation, the
              following clauses will survive: 4, 5, 6, 7.5, 7.6, 8.2, 9 and
              10.2.
              <li class="mb-3">
                Governing Law. The laws of Victoria, Australia, govern these
                terms and the parties irrevocably submit to the exclusive
                jurisdiction of the courts in Victoria, Australia.
              </li>
              <li class="mb-3">
                {" "}
                Severability. If a court of competent jurisdiction finds any
                part of these terms unenforceable, that part is severed.
              </li>
              <li class="mb-3">
                {" "}
                No Waiver. No waiver by a party is effective unless in writing
                and signed.
              </li>
              <li class="mb-3">
                {" "}
                Assignment. You may not assign any rights under these terms
                without IncNet’s prior written approval (and any attempt to do
                so will have no effect). IncNet may assign or novate these terms
                to a third party if reasonably required to effect a change of
                control, acquisition, sale of business or corporate restructure.
              </li>
              <li class="mb-3">
                Entire Agreement. These terms and any details about your
                Subscription made available online at the time of purchase
                constitute the entire agreement between the parties and
                supersede any prior discussions or agreements. Additional or
                different terms on your documents, communications, purchase
                orders or other extraneous material are expressly rejected and
                of no effect unless signed by IncNet.
              </li>
            </li>
          </ul>
        </>
      ),
    },
  ];

  return (
    <>
      <Header />
      <FaqBannner
        title="GTFS Builder Terms oF Use"
        description="These terms apply to all BaseMate subscribers and your usage of the platform"
      />
      <hr />
      <div className="container-pricing mb-5">
        <div className="container-privacy-detail mb-5">
          <h1 className="mt-2">In this Terms of Use</h1>
          <p className="text-secondary">
            These terms may be updated from time to time on notice to you, but
            no modification will take place until your next Subscription renewal
            date. IncNet will update, maintain and modify the MarketBase+
            product on an ongoing basis, but will not modify it in a manner that
            materially reduces its functionality.
          </p>
          <p>
            In these terms, capitalised words are as defined in bold below or
            elsewhere in these terms:
          </p>
          <p
            className="text-secondary text-start"
            style={{ textAlign: "start" }}
          >
            <ul>
              <li className="mb-2">
                <strong className="pr-2">Authorised User</strong>is an
                individual natural person you have authorised and registered to
                access MarketBase+ on your behalf, who is either your employee
                or on-site contractor
              </li>
              <li className="mb-2">
                <strong className="pr-2">Intellectual Property</strong>Rights
                means all intellectual property rights including, without
                limitation, patents and rights to inventions, copyright and
                neighbouring rights, trade marks, business and domain names,
                goodwill, rights in designs, database rights, rights to use and
                protect the confidentiality of confidential information
                (including know-how and trade secrets) and all other
                intellectual property rights, whether registered or
                unregistered, and all similar rights, which subsist now or in
                the future anywhere in the world.
              </li>
              <li className="mb-2">
                <strong className="pr-2">Subscription </strong>means your
                subscription for MarketBase+ which you purchased online and is
                governed by these termsr
              </li>
              <li className="mb-2">
                <strong className="pr-2">Subscription Fee</strong>means the
                applicable fee payable for your Subscription as displayed to you
                at the time of purchase or renewal.
              </li>
              <li className="mb-2">
                <strong className="pr-2">Subscription Period</strong>means the
                initial subscription period you purchased and pre-paid for, as
                adjusted in accordance with clause 7.2.
              </li>
              <li className="mb-2">
                <strong className="pr-2">Subscription Tier</strong>imeans the
                level of subscription you purchased (as displayed to you at the
                time of purchase) and all subscription entitlements, limits and
                exclusions applicable to that level of subscription.
              </li>
            </ul>
          </p>
        </div>
        <div className="faq__accordion-wrapper">
          <div className="container">
            <ul className="accordion">
              {accordionData.map((item, index) => (
                <li className="accordion__item" key={index}>
                  <a
                    href="javascript:void(0)"
                    className={
                      "accordion__link" +
                      (activeIndex === index ? " accordion__link_active" : "")
                    }
                    onClick={() => toggleAccordion(index)}
                  >
                    {item.title}
                  </a>
                  {activeIndex === index && (
                    <ul className="sub-accordion">
                      <li className="sub-accordion__item">{item.content}</li>
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Subscribe />
      <Footer />
    </>
  );
};

export default TermsOfUse;
