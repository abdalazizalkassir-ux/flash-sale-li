const BASE = 'http://localhost:3000/api/v1';
const PRODUCT_ID = 3;
const USERS = 10;
const PASSWORD = 'Password123'; // 8+ characters with an uppercase letter

async function call(path, method, body, token) {
  const res = await fetch(BASE + path, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  return { status: res.status, data: await res.json().catch(() => ({})) };
}

(async () => {
  const stamp = Date.now();
  const tokens = [];

  for (let i = 0; i < USERS; i++) {
    const email = `flash${stamp}_${i}@example.com`;
    const letter = String.fromCharCode(65 + i); // A, B, C... (names allow letters only)

    const reg = await call('/auth/register', 'POST', {
      email,
      password: PASSWORD,
      fullName: `Flash User ${letter}`,
    });
    const login = await call('/auth/login', 'POST', { email, password: PASSWORD });
    const token = login.data.accessToken;
    const cart = await call(
      '/carts/items',
      'POST',
      { productId: PRODUCT_ID, quantity: 1 },
      token,
    );

    // Show every step for the first user so a setup problem is visible.
    if (i === 0) {
      console.log('register:', reg.status, JSON.stringify(reg.data));
      console.log('login:   ', login.status, JSON.stringify(login.data).slice(0, 150));
      console.log('cart:    ', cart.status, JSON.stringify(cart.data));
    }

    if (!token || cart.status >= 300) {
      console.log(`\nSetup failed for user ${i}. Fix this first, then run again.`);
      console.log('register:', reg.status, JSON.stringify(reg.data));
      console.log('login:   ', login.status, JSON.stringify(login.data).slice(0, 150));
      console.log('cart:    ', cart.status, JSON.stringify(cart.data));
      return;
    }

    tokens.push(token);
  }

  console.log(`\nFiring ${tokens.length} orders at the same moment...`);

  // All orders start together, so they race for the stock.
  const results = await Promise.all(
    tokens.map((t) => call('/orders', 'POST', undefined, t)),
  );

  console.log('\nStatus codes:', results.map((r) => r.status));

  const accepted = results.filter((r) => r.status === 202).length;
  const outOfStock = results.filter((r) => r.status === 400).length;
  const other = results.length - accepted - outOfStock;

  console.log(`202 Accepted: ${accepted}`);
  console.log(`400 Out of stock: ${outOfStock}`);
  if (other > 0) console.log(`Other: ${other}`);

  const sample = results.find((r) => r.status === 400);
  if (sample) console.log('A 400 response looks like:', JSON.stringify(sample.data));
})();