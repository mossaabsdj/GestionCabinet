const { PrismaClient } = require("./app/generated/prisma");

async function testUrl(name, url) {
  console.log(`\nTesting ${name}...`);
  console.log(`URL: ${url.replace(/:[^:@]+@/, ":***@")}`);
  const client = new PrismaClient({
    datasources: { db: { url } },
    log: ["warn", "error"],
  });

  try {
    const count = await client.medicament.count();
    console.log(`✅ Success for ${name}! Medicament count: ${count}`);
    return true;
  } catch (err) {
    console.error(`❌ Failed for ${name}:`, err.message);
    return false;
  } finally {
    await client.$disconnect();
  }
}

async function main() {
  const base = "postgresql://neondb_owner:npg_QVjBU92nRmyi";

  // 1. Current with pooler without channel_binding
  await testUrl(
    "Pooler without channel_binding",
    `${base}@ep-sparkling-night-ayqda883-pooler.c-5.us-east-2.aws.neon.tech/amel?sslmode=require`,
  );

  // 2. Direct endpoint (no pooler)
  await testUrl(
    "Direct (no pooler)",
    `${base}@ep-sparkling-night-ayqda883.c-5.us-east-2.aws.neon.tech/amel?sslmode=require`,
  );

  // 3. Pooler with connect_timeout
  await testUrl(
    "Pooler with timeout 15s",
    `${base}@ep-sparkling-night-ayqda883-pooler.c-5.us-east-2.aws.neon.tech/amel?sslmode=require&connect_timeout=15`,
  );
}

main();
