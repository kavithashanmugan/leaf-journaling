import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Modal,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

const TermsAndConditionsText = () => {
  const navigation = useNavigation();

  const [termsModalVisible, setTermsModalVisible] = useState(false);
  const [privacyModalVisible, setPrivacyModalVisible] = useState(false);
  const [guidelinesModalVisible, setGuidelinesModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        By using our App, you acknowledge that you have read and understood our{" "}
        <Text
          style={[styles.text, styles.link]}
          onPress={() => setTermsModalVisible(true)}
        >
          terms of use,{" "}
        </Text>
        <Text
          style={[styles.text, styles.link]}
          onPress={() => setPrivacyModalVisible(true)}
        >
          privacy policy
        </Text>
        , and{" "}
        <Text
          style={[styles.text, styles.link]}
          onPress={() => setGuidelinesModalVisible(true)}
        >
          community guidelines
        </Text>
        .
      </Text>
      <Modal
        visible={termsModalVisible}
        animationType="slide"
        onRequestClose={() => setTermsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <ScrollView>
            <Text style={styles.modalHeading}>Terms of Use</Text>
            <View>
              <Text style={styles.modalText}>
                <Text style={styles.boldText}>Welcome to Leaf Lingo</Text> At
                Leaf Lingo, we strive to provide a unique and engaging
                experience for all users. By accessing our website or using our
                services, you agree to the following Terms of Use. Please read
                them carefully to understand your rights and obligations.
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.boldText}>1. Acceptance of Terms</Text> By
                accessing or using the Leaf Lingo website or services, you
                confirm that you have read, understood, and agreed to comply
                with these Terms of Use and all applicable laws and regulations.
                If you disagree with these terms, please refrain from using our
                website or services.
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.boldText}>2. User Obligations</Text> To
                enhance your experience and maintain the integrity of our
                services, you agree to: Provide accurate and complete
                information when creating an account or placing an order.
                Safeguard your account credentials and notify us immediately of
                any unauthorized use. Refrain from engaging in unlawful,
                harmful, or fraudulent activities while accessing our website or
                services. Use our website solely for personal, non-commercial
                purposes unless expressly authorized in writing by Leaf Lingo.
                Abide by our Privacy Policy, which outlines the collection, use,
                and storage of your personal data. Failure to adhere to these
                obligations may result in the suspension or termination of your
                account.
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.boldText}>3. Prohibited Activities</Text> To
                maintain the security and functionality of our website, you
                agree not to: Attempt to gain unauthorized access to our app,
                systems, or networks. Introduce any harmful code, viruses, or
                malware. Use automated tools (e.g., bots, scrapers) to access or
                extract data without prior written consent. Interfere with the
                website’s performance or disrupt its operations. Unauthorized
                activities may result in legal action and immediate suspension
                of access.
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.boldText}>4. Intellectual Property</Text>{" "}
                All content displayed on the Leaf Lingo website and app,
                including but not limited to text, graphics, logos, images,
                videos, and designs, is the exclusive property of Leaf Lingo or
                its licensors. This content is protected by copyright,
                trademark, and other intellectual property laws. You may not
                copy, reproduce, distribute, modify, or create derivative works
                from any content on our website without prior written consent
                from Leaf Lingo. Submitting any content (e.g., reviews,
                comments, or suggestions) to the Leaf Lingo website grants us a
                non-exclusive, royalty-free, perpetual, and irrevocable right to
                use, reproduce, modify, and distribute the content for
                promotional or operational purposes. You warrant that any
                submitted content does not infringe on third-party intellectual
                property rights. Unauthorized use of our intellectual property
                is subject to legal action.
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.boldText}>5. Disclaimer of Warranties</Text>{" "}
                The Leaf Lingo website and services are provided “as is” and “as
                available”. We make no warranties, express or implied, including
                but not limited to the implied warranties of merchantability,
                fitness for a particular purpose, or non-infringement. While we
                strive for accuracy and availability, we do not guarantee that
                our website will always be error-free, uninterrupted, or secure.
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.boldText}>6. Limitation of Liability</Text>{" "}
                To the fullest extent permitted by law: Leaf Lingo is not liable
                for any indirect, incidental, consequential, or punitive damages
                arising from your use of our website or services. This
                limitation includes, but is not limited to, damages resulting
                from loss of data, profits, or business opportunities. This
                provision does not affect any statutory rights you may have as a
                consumer.
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.boldText}>7. Governing Law</Text>
                These Terms of Use will be governed by and construed in
                accordance with the laws of the State where you reside, without
                regard to its conflict of law provisions.
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.boldText}>8. Arbitration</Text>
                Any dispute, controversy, or claim arising from or relating to
                these Terms of Use, including their breach, termination, or
                validity, will be resolved by binding arbitration administered
                by an independent third-party arbitration service following its
                Commercial Arbitration Rules. The arbitration will take place in
                the State where you reside. Each party will bear its arbitration
                costs, except as required by law.
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.boldText}>9. International Use</Text>
                Leaf Lingo operates primarily on servers located in the State
                where we are based, and our website complies with laws and
                regulations of that state. If you access our website from
                outside the State, you do so at your own risk and are
                responsible for compliance with local laws.
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.boldText}>10. Age Requirements</Text>
                Using the Leaf Lingo website or services, you confirm that you
                are at least 18 or the legal age of majority in your
                jurisdiction. Minors may only use the website under the
                supervision of a parent or legal guardian.
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.boldText}>11. Accessibility</Text>
                Leaf Lingo is committed to providing an inclusive and accessible
                online experience for all users. If you encounter any barriers
                while accessing our website, please contact us at
                leafandpixel@proton.me, and we will work to address your
                concerns promptly.
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.boldText}>
                  12. Modifications to Terms of Use
                </Text>
                Leaf Lingo reserves the right to revise these Terms of Use at
                any time. Significant changes will be communicated via email
                (where applicable) and prominently posted on our website at
                least 14 days before taking effect.
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.boldText}>13. Termination of Use</Text>
                Leaf Lingo reserves the right to suspend or terminate your
                access to our website or services, without notice, if you
                violate these Terms or if it is deemed necessary to protect our
                business or customers.
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.boldText}>14. Indemnification</Text>
                You agree to indemnify, defend, and hold harmless Leaf Lingo,
                its affiliates, officers, employees, and agents from any claims,
                damages, or liabilities (including legal fees) arising from your
                violation of these Terms or misuse of our website or services.
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.boldText}>15. Severability</Text>
                If any provision of these Terms of Use is deemed invalid or
                unenforceable, the remaining provisions will remain in full
                force and effect.
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.boldText}>16. Acknowledgment</Text>
                By accessing the Leaf Lingo website or services, you acknowledge
                that you have read, understood, and agree to be bound by these
                Terms of Use.
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.boldText}>17. Contact Information</Text>
                We value your feedback and are here to assist with any questions
                regarding these Terms or your experience with Leaf Lingo. Please
                contact us at leafandpixel@proton.me.
              </Text>
            </View>
          </ScrollView>
          <TouchableOpacity
            onPress={() => setTermsModalVisible(false)}
            style={styles.goBackButton}
          >
            <Text>Go back</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        visible={privacyModalVisible}
        animationType="slide"
        onRequestClose={() => setPrivacyModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <ScrollView>
            <Text style={styles.modalHeading}>Privacy Policy</Text>
            <View>
              <Text style={styles.modalText}>
                <Text style={styles.boldText}>
                  Protecting Your Voice, Ensuring Your Privacy
                </Text>{" "}
                At At Leaf Lingo, your privacy is essential to us. This Privacy
                Policy outlines our commitment to safeguarding your personal
                information and maintaining your trust. Each detail we collect
                and use is designed to create an enriching experience that meets
                your expectations. We value transparency and ethical practices,
                ensuring that your data is handled with respect and care.
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.boldText}>1. Information Collection</Text>{" "}
                To provide you with an exceptional app experience, we may
                collect the following information: Contact Details: Name, email
                address, and any other necessary contact information for
                seamless communication and support. User Preferences:
                Information provided when creating an account or participating
                in app activities, enabling personalized recommendations and
                services. Usage Data: Information about how you interact with
                the app, including your actions and feedback to improve
                functionality and user experience. We collect this information
                directly when you create an account, use our app, or communicate
                with us.
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.boldText}>2. Use of Information</Text> Your
                personal information will be utilized solely to enhance your
                experience with Leaf Lingo, including: Service Delivery:
                Ensuring accurate functioning of the app and fulfilment of user
                needs. Customer Support: Providing timely and effective
                assistance. Personalized Communication: Sending updates, tips,
                and information related to your preferences, provided you have
                opted in. Enhancing Services: Improving our offerings based on
                your interactions and feedback. We prioritize your privacy, and
                our communications are designed to inspire rather than
                overwhelm. Promotional materials will only be sent to those who
                have opted in.
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.boldText}>3. Sharing Information</Text> Your
                information will be handled securely and shared only when
                necessary for our operations, which may include: Service
                Providers: Trusted partners who assist with app functionality
                and customer support, all bound by strict confidentiality
                agreements. We do not sell or rent your personal information to
                third parties. In rare cases, we may disclose your information
                to comply with legal obligations or protect our rights and those
                of our users.
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.boldText}>
                  4. Cookies and Tracking Technologies
                </Text>
                Our app may use cookies and similar technologies to enhance your
                experience by: Remembering your preferences for future visits.
                Analysing performance to optimize functionality. Offering
                personalised content and promotions based on your interests. You
                can manage your cookie preferences through your device settings.
                Please note that declining cookies may limit certain features of
                the app.
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.boldText}>
                  5. Your Rights and Preferences
                </Text>{" "}
                At Leaf Lingo, we respect your rights regarding your personal
                information. You may: Access: Request a copy of the personal
                information we hold about you. Correct: Update any inaccuracies
                in your data. Delete: Request the deletion of your personal
                information as permitted by law. Portability: Request the
                transfer of your data to another service provider, where
                applicable. Manage Preferences: Opt-out of promotional
                communications at any time by following the instructions in our
                emails or contacting us directly. To exercise your rights,
                please contact us at: leafandpixel@proton.me
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.boldText}>6. Data Security</Text> Restricted
                Access: Access to your information is limited to authorized
                personnel only. In the event of a data breach, we will notify
                affected individuals promptly and provide guidance on protective
                measures in compliance with applicable laws.
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.boldText}>7. Retention of Information</Text>
                We retain your personal information only as long as necessary to
                fulfil its purpose, including: Maintaining account history.
                Complying with legal and regulatory requirements. Secure
                deletion or anonymization of your data when no longer needed.
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.boldText}>8. International Users</Text>
                For users accessing Leaf Lingo outside your country, please be
                aware that your personal information may be transferred, stored,
                and processed in locations with different privacy laws than your
                jurisdiction. We ensure that all data is handled securely and in
                alignment with this Privacy Policy.
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.boldText}>9. Updates to This Policy</Text>
                Leaf Lingo reserves the right to update this Privacy Policy to
                reflect changes in our practices. Significant updates will be
                communicated through prominent notices within the app. We
                encourage you to review this policy periodically for the latest
                information.
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.boldText}>
                  10. Your Privacy, Our Assurance
                </Text>
                At Leaf Lingo, your trust is fundamental to our relationship. We
                treat your personal information with the same care and
                consideration that reflects our commitment to excellence. For
                personalised assistance regarding privacy concerns, please
                contact us at: leafandpixel@proton.me
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.boldText}>
                  Your voice inspires us to provide an extraordinary experience.
                  Thank you for choosing Leaf Lingo, where privacy meets
                  personalisation.
                </Text>
              </Text>
            </View>
          </ScrollView>
          <TouchableOpacity
            onPress={() => setPrivacyModalVisible(false)}
            style={styles.goBackButton}
          >
            <Text>Go back</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        visible={guidelinesModalVisible}
        animationType="slide"
        onRequestClose={() => setGuidelinesModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <ScrollView>
            <Text style={styles.modalHeading}>Community Guidelines</Text>
            <View>
              <Text style={styles.modalText}>
                <Text style={styles.boldText}>
                  Welcome to Leaf Lingo! We are delighted to have you as part of
                  our community. To ensure a positive experience for all users,
                  we have established the following guidelines. By using our
                  platform, you agree to adhere to these guidelines.
                </Text>
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.boldText}>1. Respectful Communication</Text>
                Engage with others in a respectful and constructive manner.
                Disagreements are natural, but personal attacks, harassment, and
                hate speech will not be tolerated. Encourage open dialogue and
                be open to diverse perspectives. Aim to promote a friendly and
                inclusive environment.
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.boldText}>2. Stay on Topic</Text> Keep
                discussions relevant to the purpose and themes of Leaf Lingo.
                Off-topic posts may be removed to maintain the focus of
                conversations. Feel free to share experiences or ask questions
                that will benefit others within the community.
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.boldText}>
                  3. No Spamming or Self-Promotion
                </Text>{" "}
                Avoid posting repetitive content or excessive self-promotion.
                This includes unsolicited advertisements, affiliate links, or
                promotions for external services. Share information that adds
                value to the community rather than seeking personal gain.
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.boldText}>4. Protect Privacy</Text>
                Respect the privacy of others. Do not share personal information
                about yourself or others without consent. Be cautious when
                sharing sensitive information and remember that what you post is
                public.
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.boldText}>5. Content Guidelines</Text> Share
                original content or properly credit sources. Plagiarism or the
                unauthorized use of others' intellectual property is strictly
                prohibited. Ensure that the content you post is appropriate for
                all ages, free of offensive material, and compliant with
                copyright laws.
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.boldText}>6. Safety and Security</Text>{" "}
                Report any suspicious or concerning behavior to the Leaf Lingo
                moderation team. We take the safety of our community seriously.
                Follow best practices for online safety, including safeguarding
                personal information and being cautious of phishing attempts.
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.boldText}>7. Constructive Feedback</Text>
                Encourage and provide constructive feedback in a way that helps
                others grow. Offer suggestions while being kind and considerate.
                Critique ideas, not individuals. Focus on the content rather
                than making it personal.
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.boldText}>
                  8. Compliance with Guidelines
                </Text>
                Violating these community guidelines may result in warnings,
                temporary suspensions, or permanent bans from Leaf Lingo,
                depending on the severity of the violation. We reserve the right
                to modify these guidelines as needed to ensure the continued
                safety and enjoyment of our community.
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.boldText}>9. Reporting Violations</Text>
                If you see content that violates these guidelines, please report
                it to our moderation team immediately. We appreciate your help
                in keeping our community safe and respectful.
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.boldText}>10. Have Fun!</Text>
                Enjoy your time in the Leaf Lingo community! Participate
                actively, learn from others, and share your love for creativity
                and connection.
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.boldText}>Contact Information:</Text>
                For any questions or concerns about these community guidelines,
                please contact us at leafandpixel@proton.me. Thank you for being
                a valued member of the Leaf Lingo community! Together, let's
                create a positive and enriching environment for everyone.
              </Text>
            </View>
          </ScrollView>
          <TouchableOpacity
            onPress={() => setGuidelinesModalVisible(false)}
            style={styles.goBackButton}
          >
            <Text>Go back</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
  text: {
    color: "#22252d80",
    fontFamily: "Inter",
    lineHeight: 17,
    fontSize: 12,
  },
  link: {
    fontFamily: "medium",
    textDecorationLine: "underline",
    textDecorationColor: "#22252d80",
    color: "#22252d",
  },
  modalContainer: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 120,
    backgroundColor: "#8ac0e5",
  },
  modalHeading: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "700",
    marginBottom: 20,
  },
  boldText: {
    fontWeight: "700",
    marginRight: 10,
  },
  goBackButton: {
    backgroundColor: "#ffeb94",
    padding: 15,
    borderRadius: 16,
  },
});

export default TermsAndConditionsText;
