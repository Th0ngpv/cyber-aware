import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // ---------- Users ----------
  const user = await prisma.user.upsert({
    where: { email: "demo@cyberaware.com" },
    update: {},
    create: {
      name: "Demo User",
      email: "demo@cyberaware.com",
      emailVerified: new Date(),
      image: "https://i.pravatar.cc/150?img=12",
    },
  });
  console.log("Demo user id:", user.id);

  // ---------- Lessons ----------

  // Lesson 1: Phishing Awareness
  const phishingLesson = await prisma.lesson.upsert({
    where: { slug: "phishing-awareness" },
    update: {},
    create: {
      title: "Phishing Awareness for Employees",
      slug: "phishing-awareness",
      description: "Learn to recognize and avoid phishing emails in the workplace.",
      pages: {
        create: [
          {
            pageNumber: 1,
            title: "What is Phishing?",
            content: {
              html: `
                <h2>Phishing Explained</h2>
                <p>Phishing is a <b>social engineering attack</b> aimed at stealing sensitive information.</p>
                <ul>
                  <li>Emails pretending to be from banks</li>
                  <li>Fake login pages</li>
                  <li>Urgent requests for credentials</li>
                </ul>
              `,
            },
          },
          {
            pageNumber: 2,
            title: "Recognizing Phishing Emails",
            content: {
              html: `
                <h2>Spot a Fake Email</h2>
                <p>Always check the sender's email and links before clicking.</p>
                <div style="border:1px solid #ccc; padding:10px;">
                  <p><b>From:</b> security@bank-fake.com</p>
                  <p><b>Subject:</b> Urgent: Verify Your Account</p>
                  <p>Do NOT click suspicious links!</p>
                </div>
              `,
            },
          },
        ],
      },
    },
  });

  console.log("Upserted lesson:", phishingLesson.slug);

  // ---------- Quizzes for Phishing Lesson ----------
  const phishingQuizzes = [
    {
      question: "What is the main goal of a phishing attack?",
      options: [
        { text: "To steal sensitive information" },
        { text: "To update software" },
        { text: "To improve email performance" },
      ],
      answer: "To steal sensitive information",
    },
    {
      question: "Which of these is a common sign of a phishing email?",
      options: [
        { text: "Suspicious sender email" },
        { text: "Proper grammar and spelling" },
        { text: "Email from your manager" },
      ],
      answer: "Suspicious sender email",
    },
    {
      question: "What should you do if you receive a suspicious email?",
      options: [
        { text: "Click links immediately" },
        { text: "Report it to IT/security team" },
        { text: "Forward it to everyone" },
      ],
      answer: "Report it to IT/security team",
    },
  ];

  for (const q of phishingQuizzes) {
    await prisma.quiz.create({
      data: {
        lessonId: phishingLesson.id,
        question: q.question,
        options: q.options,
        answer: q.answer,
      },
    });
  }

  // Lesson 2: Password Security
  const passwordLesson = await prisma.lesson.upsert({
    where: { slug: "password-security" },
    update: {},
    create: {
      title: "Password Security for Employees",
      slug: "password-security",
      description: "Learn how to create and manage strong passwords to secure your accounts.",
      pages: {
        create: [
          {
            pageNumber: 1,
            title: "Creating Strong Passwords",
            content: {
              html: `
                <h2>Strong Passwords</h2>
                <p>Use a mix of letters, numbers, and symbols. Avoid common words and repeated characters.</p>
              `,
            },
          },
          {
            pageNumber: 2,
            title: "Using Password Managers",
            content: {
              html: `
                <h2>Password Managers</h2>
                <p>Store your passwords securely and generate strong random passwords for each account.</p>
              `,
            },
          },
        ],
      },
    },
  });

  console.log("Upserted lesson:", passwordLesson.slug);

  // ---------- Quizzes for Password Lesson ----------
  const passwordQuizzes = [
    {
      question: "Which is the strongest password?",
      options: [
        { text: "Password123" },
        { text: "P@ssw0rd!9X" },
        { text: "123456" },
      ],
      answer: "P@ssw0rd!9X",
    },
    {
      question: "Why use a password manager?",
      options: [
        { text: "To remember all passwords easily" },
        { text: "To share passwords with colleagues" },
        { text: "To make passwords simple" },
      ],
      answer: "To remember all passwords easily",
    },
    {
      question: "What should you avoid in passwords?",
      options: [
        { text: "Common words or repeated characters" },
        { text: "Mixing letters, numbers, symbols" },
        { text: "Randomly generated characters" },
      ],
      answer: "Common words or repeated characters",
    },
  ];

  for (const q of passwordQuizzes) {
    await prisma.quiz.create({
      data: {
        lessonId: passwordLesson.id,
        question: q.question,
        options: q.options,
        answer: q.answer,
      },
    });
  }

  console.log("Database seeded successfully with lessons and quizzes!");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
