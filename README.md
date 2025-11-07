# React + typeScript + vite

Ecommerce de tegnologia desarollado en react

# Herramientas utilizadas:

- React
- Supabase
- Tanstack Query
- Zustand
- React Hook Form
- Zod
- React  Hook Resolvers

# Librerias:

- Tailwindcss
- React-router-dom
- React-icons

(auth.uid () IN (
  SELECT user_roles.user_id
  FROM user_roles
  WHERE (user_roles.roles = 'admin'::text)
))