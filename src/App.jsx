import { Suspense, lazy, memo, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import './App.css';

// Lazy-load components
const About = lazy(() => import('./components/About'));
const Services = lazy(() => import('./components/Services'));
const Process = lazy(() => import('./components/Process'));
const Trust = lazy(() => import('./components/Trust'));
const Team = lazy(() => import('./components/Team'));
const CTA = lazy(() => import('./components/CTA'));
const Footer = lazy(() => import('./components/Footer'));

const ComponentLoader = memo(() => (
  <div className="flex items-center justify-center py-12 min-h-[200px]">
    <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
    <span className="sr-only">Loading...</span>
  </div>
));
ComponentLoader.displayName = 'ComponentLoader';

const ErrorFallback = memo(({ resetErrorBoundary }) => (
  <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
    <h2 className="text-xl font-bold text-red-400 mb-4">Something went wrong</h2>
    <p className="text-gray-400 mb-4 max-w-md">
      An error occurred loading this section. Please refresh.
    </p>
    <button
      onClick={resetErrorBoundary}
      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      Try again
    </button>
  </div>
));
ErrorFallback.displayName = 'ErrorFallback';

const lazyWithBoundary = (Component) => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <Suspense fallback={<ComponentLoader />}>
      <Component />
    </Suspense>
  </ErrorBoundary>
);

const App = () => {
  useEffect(() => {
    const timer = setTimeout(() => import('./components/About').catch(() => {}), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleHover = () => import('./components/Services').catch(() => {});
    document.querySelectorAll('a[href="#services"]').forEach(link =>
      link.addEventListener('mouseenter', handleHover, { once: true })
    );
    return () => {
      document.querySelectorAll('a[href="#services"]').forEach(link =>
        link.removeEventListener('mouseenter', handleHover)
      );
    };
  }, []);

  return (
    <div className="App">
      <Navigation />
      <Hero />
      {lazyWithBoundary(About)}
      {lazyWithBoundary(Services)}
      {lazyWithBoundary(Process)}
      {lazyWithBoundary(Trust)}
      {lazyWithBoundary(Team)}
      {lazyWithBoundary(CTA)}
      {lazyWithBoundary(Footer)}
    </div>
  );
};

export default App;
