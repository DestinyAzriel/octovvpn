-- Run in Supabase: SQL Editor. Edit rows later in Table Editor; the site updates within a minute.
create table plans (id serial primary key, sort int default 0, published bool default true, name text, price numeric, badge text, features text[]);
create table servers (id serial primary key, sort int default 0, published bool default true, city text, country_code text, nodes int, mbps int, status text default 'online');
create table faqs (id serial primary key, sort int default 0, published bool default true, q text, a text);
create table testimonials (id serial primary key, sort int default 0, published bool default true, quote text, author text, detail text);
-- Block all public access; the site reads and writes with the server-side service key only.
alter table plans enable row level security; alter table servers enable row level security; alter table faqs enable row level security;
alter table testimonials enable row level security;
insert into plans (sort,name,price,badge,features) values
 (1,'Stealth',0,null,array['1 device','3 regions','10 GB per month','Basic encryption']),
 (2,'Phantom',6.99,null,array['3 devices','All 4 regions','100 GB per month','Kill switch','Ad blocker']),
 (3,'Specter',12.99,'Most popular',array['6 devices','Priority on all regions','Unlimited data','Smart region select','Full security suite']),
 (4,'Elite',24.99,'Best value',array['Unlimited devices','Dedicated node option','Unlimited bandwidth','24/7 live chat','Dedicated manager']);
insert into servers (sort,city,country_code,nodes,mbps) values (1,'Singapore','SG',2,274),(2,'US West','US',3,210),(3,'Frankfurt','DE',3,1000),(4,'Sydney','AU',1,150);
insert into faqs (sort,q,a) values
 (1,'Does OctoVVPN work in China?','OctoVVPN uses obfuscation built for restrictive networks, but results vary by network and location and access cannot be guaranteed.'),
 (2,'How do I get started?','Install the Android or Windows app, create an account, and start on the free Stealth plan.'),
 (3,'What devices are supported?','Windows and Android today. More platforms are planned.'),
 (4,'Is there a free trial?','Yes. Stealth is free for 7 days with 1 device, 3 regions and 10 GB per month.'),
 (5,'What is your refund policy?','All paid plans have a 30-day money-back guarantee.'),
 (6,'How do I contact support?','Email support@octovvpn.net.');
-- Optional: override any info page (slugs: privacy, terms, refunds, cookies, gdpr, about, contact, status, delete-account). Separate paragraphs with a blank line.
create table pages (slug text primary key, title text, body text, published bool default true);
alter table pages enable row level security;
