-- Mangalmurti routes only. Replaces the old Pune Cabz catalog.
delete from public.popular_routes;

insert into public.popular_routes (from_city, to_city, duration, from_price, tag, image_url, sort_order, published)
values
  ('Kolhapur', 'Mumbai', '7h 30m', 'Quote', 'Daily', '/fleet/innova-crysta.jpg', 1, true),
  ('Kolhapur', 'Pune', '4h 30m', 'Quote', 'Daily', '/fleet/innova-hycross.jpg', 2, true),
  ('Kolhapur', 'Belgaum', '2h 30m', 'Quote', 'Daily', '/fleet/sedan.jpg', 3, true),
  ('Kolhapur', 'Solapur', '4h 30m', 'Quote', 'Daily', '/fleet/kia-carens.jpg', 4, true),
  ('Kolhapur', 'Goa', '5h', 'Quote', 'Daily', '/fleet/fortuner.jpg', 5, true),
  ('Mumbai', 'Kolhapur', '7h 30m', 'Quote', 'Daily', '/fleet/urbania.jpg', 6, true),
  ('Mumbai', 'Pune', '3h 30m', 'Quote', 'Daily', '/fleet/sedan.jpg', 7, true),
  ('Mumbai', 'Belgaum', '9h', 'Quote', 'Daily', '/fleet/tempo-ac.jpg', 8, true),
  ('Mumbai', 'Goa', '10h', 'Quote', 'Daily', '/fleet/mercedes.jpg', 9, true),
  ('Pune', 'Kolhapur', '4h 30m', 'Quote', 'Daily', '/fleet/innova-hycross.jpg', 10, true),
  ('Pune', 'Mumbai', '3h 30m', 'Quote', 'Daily', '/fleet/innova-crysta.jpg', 11, true),
  ('Pune', 'Belgaum', '5h 30m', 'Quote', 'Daily', '/fleet/thar.jpg', 12, true),
  ('Pune', 'Goa', '8h 30m', 'Quote', 'Daily', '/fleet/audi.jpg', 13, true);
