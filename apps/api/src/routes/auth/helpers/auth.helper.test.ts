import { hashPassword, comparePassword } from "./auth.helper";

const PATTERN = new RegExp("^\\$2[ayb]\\$.{56}$");
const SALT_ROUNDS = 10;

describe("hashPassword", () => {
  it("generate a hash from a string input", async () => {
    expect(PATTERN.test(await hashPassword("password", SALT_ROUNDS))).toBe(
      true
    );
    expect(PATTERN.test(await hashPassword("random", SALT_ROUNDS))).toBe(true);
    expect(PATTERN.test(await hashPassword("cookies123", SALT_ROUNDS))).toBe(
      true
    );
    expect(
      PATTERN.test(await hashPassword("rHdquTzZbhmtNLVhN4wa", SALT_ROUNDS))
    ).toBe(true);
  });
});

describe("comparePassword", () => {
  it("return true if password matches", async () => {
    const hashed = await hashPassword("myTestUserPassword", SALT_ROUNDS);
    expect(await comparePassword("myTestUserPassword", hashed)).toBe(true);
  });

  it("return false if password does not match", async () => {
    const hashed = await hashPassword("myTestUserPassword", SALT_ROUNDS);
    expect(await comparePassword("newlyCreatedPassword", hashed)).toBe(false);
  });
});
