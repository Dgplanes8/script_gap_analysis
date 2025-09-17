Project Brief: AI Ad Script Generator
Last Updated: September 16, 2025

This document outlines the complete development plan for the "AI Ad Script Generator," a tool to be integrated into an existing website.

1. Project Overview
1.1. Goal
To create a new page on an existing website that allows users to generate advertising concepts and scripts using an AI model. The tool will feature a tiered access system: a one-time free use for anonymous guests, a few free uses for registered users, and paid access for continued use.

1.2. User Flow
Anonymous User: Can generate one script for free. Tracked by a salted hash of their IP address for privacy.

Registered User: After signing up, a user receives 3 free credits.

Paid User: Once credits are depleted, the user is prompted to purchase more via a Stripe checkout.

1.3. Technology Stack
Frontend: Existing Website (HTML/CSS) + Vanilla JavaScript for the new page.

Backend Platform: Supabase (Database, Authentication, Edge Functions).

AI Service: OpenRouter.

Payment Processor: Stripe.

2. Supabase Backend Setup
This section contains the complete SQL for setting up the database. This code should be run in the Supabase SQL Editor.

2.1. SQL Database Schema
This script creates the necessary tables, enables security, and sets up automation for new user profiles.

SQL

-- #############################################################
-- ## STEP 1: CREATE PROFILES TABLE FOR REGISTERED USERS      ##
-- #############################################################
-- Create the table to store user-specific data
CREATE TABLE public.profiles (
  id uuid NOT NULL PRIMARY KEY,
  credits_remaining integer DEFAULT 3,
  stripe_customer_id text UNIQUE,
  updated_at timestamptz DEFAULT now()
);

-- Link it to the built-in auth.users table
ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users (id) ON DELETE CASCADE;

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies to ensure users can only access their own data
CREATE POLICY "Users can view their own profile." ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile." ON public.profiles
  FOR UPDATE USING (auth.uid() = id);


-- #############################################################
-- ## STEP 2: CREATE ANONYMOUS USAGE TABLE FOR GUESTS         ##
-- #############################################################
-- Create the table to track usage by hashed IP address
CREATE TABLE public.anonymous_usage (
  ip_address text NOT NULL PRIMARY KEY,
  usage_count integer DEFAULT 0,
  last_used_at timestamptz DEFAULT now()
);


-- #############################################################
-- ## STEP 3: AUTOMATE PROFILE CREATION                       ##
-- #############################################################
-- Create a function that inserts a new row into profiles when a user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id)
  VALUES (new.id);
  RETURN new;
END;
$$;

-- Create a trigger that calls the function after a user is created in auth.users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
3. Frontend Integration
This section details the prompts for generating the HTML and JavaScript that will be added to the existing website.

3.1. Prompt: Generate HTML Structure
"I am adding an 'AI Ad Script Generator' to my existing website. Generate the HTML structure for this tool. This HTML will be placed inside my main content div.

You must use my existing CSS classes for styling. Do not write any new CSS. Here are my classes (replace with your actual classes):

Buttons: <button class="btn btn-primary">

Form Inputs: <input class="form-control"> and <textarea class="form-control">

Containers: The results div should have the class card result-card.

Typography: The main heading should be <h1 class="page-title">.

The structure needs to include:

A <form> with the ID ad-form containing inputs for: Company Name, Product Description, Target Audience, a <select> for Platform, a <select> for Tone, and an input for Call to Action.

A submit button with the text "Generate Script".

A div with ID loading-indicator (hidden by default).

A div with ID script-result for displaying the output.

A div with ID user-status to show user email and remaining credits."

3.2. Prompt: Generate Client-Side JavaScript
"Generate the complete client-side JavaScript for the 'AI Ad Script Generator' page in a file named ad-generator.js.

The script must perform the following actions:

Initialize Supabase Client: Use SUPABASE_URL and SUPABASE_ANON_KEY environment variables.

Manage Auth State: On page load, check the user's authentication state using supabase.auth.onAuthStateChange.

If logged in, fetch their profile from the profiles table to get their credits_remaining and display it in the #user-status div.

If logged out, show the login/signup buttons.

Handle Form Submission: Add a submit event listener to the #ad-form.

Prevent default submission.

Show the #loading-indicator.

Get all form data into an object.

Invoke the generate-script Supabase Edge Function with the form data.

If the function returns a script, display it in #script-result.

If the function returns a 402 error (out of credits), show a "Purchase More Credits" button.

Display any other errors appropriately.

Hide the #loading-indicator when done.

Handle 'Purchase Credits' Button: When this button is clicked, invoke the create-checkout-session Edge Function. On success, redirect the user to the checkout_url returned by the function."

4. Backend Logic (Supabase Edge Functions)
These prompts are for generating the server-side logic that will run on Supabase.

4.1. Prompt: generate-script Edge Function
"Generate the Deno/TypeScript code for a Supabase Edge Function named generate-script. It must:

Authenticate the user from the request headers. Handle both authenticated JWTs and unauthenticated requests (for anonymous users, get their IP address from the x-forwarded-for header).

Check the database for available credits based on whether the user is authenticated or anonymous.

If credits are 0, return a 402 Payment Required status.

If credits are available, construct a detailed prompt for the OpenRouter API using the data from the request body.

Call the OpenRouter Completions API using the OPENROUTER_API_KEY secret.

Upon a successful response from OpenRouter, decrement the user's credit count in the appropriate table (profiles or anonymous_usage).

Return the AI-generated script to the client with a 200 OK status."

4.2. Prompt: create-checkout-session Edge Function
"Generate the Deno/TypeScript code for a Supabase Edge Function named create-checkout-session. It must:

Ensure the user is authenticated. If not, return a 401 Unauthorized error.

Initialize the Stripe SDK using the STRIPE_SECRET_KEY.

Query the user's profiles table to get their stripe_customer_id.

If the stripe_customer_id is null, create a new Stripe Customer with the user's email and save the new customer ID back to their profile in Supabase.

Create a Stripe Checkout Session. Use the Stripe Customer ID and a hardcoded Price ID (stored as STRIPE_PRICE_ID in environment variables).

Return the url from the Stripe Checkout Session object to the client."

4.3. Prompt: stripe-webhook Edge Function
"Generate the Deno/TypeScript code for a Supabase Edge Function named stripe-webhook to handle events from Stripe. It must:

Initialize the Stripe SDK.

Verify the webhook signature using the STRIPE_WEBHOOK_SECRET to ensure the request is from Stripe.

Listen for the checkout.session.completed event type.

When the event is received, extract the stripe_customer_id from the event object.

Query the profiles table to find the user with that stripe_customer_id.

Update the user's credits_remaining by adding a fixed amount (e.g., 50).

Return a 200 OK response to acknowledge receipt of the webhook."

5. Configuration & Deployment
5.1. Environment Variables
The following secrets and variables must be set in the Supabase project dashboard (or via the CLI for local development).

SUPABASE_URL: Public URL of your Supabase project.

SUPABASE_ANON_KEY: Public anon key for your Supabase project.

SUPABASE_SERVICE_ROLE_KEY: Service-level key used by Edge Functions when writing through RLS-protected tables.

OPENROUTER_API_KEY: Your secret API key from OpenRouter.

STRIPE_SECRET_KEY: Your secret Stripe API key.

STRIPE_WEBHOOK_SECRET: The webhook signing secret from Stripe.

STRIPE_PRICE_ID: The ID of the product price you created in Stripe.

ANON_USAGE_PEPPER: Secret salt/pepper used to hash anonymous user IP addresses before storing usage.

5.2. Deployment Checklist
Run the SQL from Section 2 in the Supabase SQL Editor.

Create the three Edge Functions (generate-script, create-checkout-session, stripe-webhook) using the Supabase CLI.

Add the generated code to each function file.

Set all required secrets using supabase secrets set.

Deploy the functions using supabase functions deploy.

Add the new HTML snippet to your website.

Add the new ad-generator.js script to your website and ensure it is loaded on the correct page.

Configure the Stripe webhook endpoint in the Stripe dashboard to point to your deployed stripe-webhook function URL.
