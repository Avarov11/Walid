/*
  # Interior Design Company Database Schema

  ## Overview
  This migration creates the database structure for a luxury interior design company website.
  
  ## New Tables
  
  ### `projects`
  Portfolio projects showcasing completed interior design work
  - `id` (uuid, primary key) - Unique project identifier
  - `title` (text) - Project name/title
  - `description` (text) - Detailed project description
  - `project_type` (text) - Type: villa, apartment, house, etc.
  - `location` (text) - Project location
  - `image_url` (text) - Main project image URL
  - `gallery_images` (text array) - Additional project images
  - `completion_date` (date) - When project was completed
  - `featured` (boolean) - Whether to feature on homepage
  - `display_order` (integer) - Order for displaying projects
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Record update timestamp
  
  ### `consultation_requests`
  Client consultation and contact requests
  - `id` (uuid, primary key) - Unique request identifier
  - `client_name` (text) - Client's full name
  - `email` (text) - Client's email address
  - `phone` (text) - Client's phone number
  - `project_type` (text) - Type: villa, apartment, house, etc.
  - `location` (text) - Project location
  - `budget_range` (text) - Estimated budget range
  - `preferred_date` (date) - Preferred consultation date
  - `message` (text) - Additional details/requirements
  - `status` (text) - Request status: pending, contacted, completed
  - `created_at` (timestamptz) - Request submission timestamp
  
  ## Security
  - Enable RLS on all tables
  - Public read access for projects (portfolio display)
  - Authenticated admin access for managing projects
  - Public insert access for consultation requests
  - Authenticated admin access for viewing consultation requests
*/

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  project_type text NOT NULL,
  location text NOT NULL,
  image_url text NOT NULL,
  gallery_images text[] DEFAULT '{}',
  completion_date date,
  featured boolean DEFAULT false,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create consultation_requests table
CREATE TABLE IF NOT EXISTS consultation_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  project_type text NOT NULL,
  location text NOT NULL,
  budget_range text NOT NULL,
  preferred_date date,
  message text DEFAULT '',
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultation_requests ENABLE ROW LEVEL SECURITY;

-- Projects policies: Public read access
CREATE POLICY "Anyone can view published projects"
  ON projects FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Authenticated users can view all projects"
  ON projects FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update projects"
  ON projects FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete projects"
  ON projects FOR DELETE
  TO authenticated
  USING (true);

-- Consultation requests policies: Public can submit, authenticated can view
CREATE POLICY "Anyone can submit consultation requests"
  ON consultation_requests FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view consultation requests"
  ON consultation_requests FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update consultation requests"
  ON consultation_requests FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS projects_featured_idx ON projects(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS projects_display_order_idx ON projects(display_order);
CREATE INDEX IF NOT EXISTS consultation_requests_status_idx ON consultation_requests(status);
CREATE INDEX IF NOT EXISTS consultation_requests_created_at_idx ON consultation_requests(created_at DESC);