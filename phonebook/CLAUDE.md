# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React phonebook application built with Vite. The app allows users to add names to a phonebook with a simple form interface.

## Development Commands

- `pnpm dev` - Start development server with hot reload
- `pnpm build` - Build for production
- `pnpm lint` - Run ESLint to check code quality
- `pnpm preview` - Preview production build locally

## Architecture

- **Frontend Framework**: React 19 with functional components and hooks
- **Build Tool**: Vite for fast development and building
- **State Management**: React useState for local component state
- **Styling**: CSS files imported directly into components

## Project Structure

- `src/App.jsx` - Main application component containing phonebook form and state
- `src/main.jsx` - Application entry point with React 19 createRoot
- `src/App.css` & `src/index.css` - Component and global styles
- `eslint.config.js` - ESLint configuration with React-specific rules

## Code Standards

- Uses ESLint with React hooks and React refresh plugins
- Custom rule: unused variables starting with uppercase/underscore are ignored
- Functional components with hooks pattern
- Event handlers follow React conventions (e.g., `handleNameChange`)