export const GetDataHargaEmas = async (params) => {
  const searchParams = new URLSearchParams(params);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/backend/hargaemas?${searchParams}`,
    // { next: { revalidate: 120 } }
    { cache: 'no-store' }
  );

  const data = await response.json();

  return data;
};

export const GetDataCategory = async (params) => {
  const searchParams = new URLSearchParams(params);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/backend/v1/categories?${searchParams}`,
    { cache: 'no-store' }
  );

  const data = await response.json();

  return data;
};

export const GetDataSlider = async (params) => {
  const searchParams = new URLSearchParams(params);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/backend/v1/sliders?${searchParams}`,
    { cache: 'no-store' }
  );

  const data = await response.json();

  return data;
};

export const GetDataCampaign = async (params) => {
  const searchParams = new URLSearchParams(params);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/backend/v1/campaigns?${searchParams}`,
    { cache: 'no-store' }
  );

  const data = await response.json();

  return data;
};

export const GetDataFaqs = async (params) => {
  const searchParams = new URLSearchParams(params);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/backend/v1/faqs?${searchParams}`,
    { cache: 'no-store' }
  );

  const data = await response.json();

  return data;
};

export const GetDataRekenings = async (params) => {
  const searchParams = new URLSearchParams(params);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/backend/v1/rekenings?${searchParams}`,
    { cache: 'no-store' }
  );

  const data = await response.json();

  return data;
};

export const GetDataTestimonials = async (params) => {
  const searchParams = new URLSearchParams(params);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/backend/v1/testimonials?${searchParams}`,
    { cache: 'no-store' }
  );

  const data = await response.json();

  return data;
};

export const GetDataDonation = async (params) => {
  const searchParams = new URLSearchParams(params);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/backend/v1/donations?${searchParams}`,
    { cache: 'no-store' }
  );

  const data = await response.json();

  return data;
};

export const PostDataDonation = async (params) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/backend/v1/donations`,
    { method: 'POST', body: params, credentials: 'include' }
  );

  const data = await response.json();

  return data;
};

export const GetDataNews = async (params) => {
  const searchParams = new URLSearchParams(params);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/news/posts?${searchParams}`,
    // { next: { revalidate: 120 } }
    { cache: 'no-store' }
  );

  const data = await response.json();

  return {
    data: data,
    total: response.headers.get('X-WP-Total'),
  };
};

export const GetDataBlog = async (params) => {
  const searchParams = new URLSearchParams(params);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/blog/posts?${searchParams}`,
    // { next: { revalidate: 120 } }
    { cache: 'no-store' }
  );

  const data = await response.json();

  return {
    data: data,
    total: response.headers.get('X-WP-Total'),
  };
};
