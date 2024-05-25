import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import 'react-loading-skeleton/dist/skeleton.css';
import Register from './pages/onboarding/Register';
import Login from './pages/onboarding/Login';
import ProtectedRoute from './layout/ProtectedRoute';
import Home from './pages/blogs/Home';
import Blog from './pages/blogs/Blog';
import NewBlog from './pages/blogs/NewBlog';
import ForgotPassword from './pages/onboarding/ForgotPassword';
import NotFound from './pages/NotFound';
import Author from './pages/blogs/Author';
import Library from './pages/blogs/Library';
import Archived from './pages/blogs/Archived';
import Profile from './pages/Profile';
import EditBlog from './pages/blogs/EditBlog';
import ResetPassword from './pages/onboarding/ResetPassword';
import { HelmetProvider } from 'react-helmet-async';

function App() {
    return (
        <HelmetProvider>
            <BrowserRouter>
                <Toaster position="top-right" richColors />
                <Routes>
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route
                        path="forgot-password"
                        element={<ForgotPassword />}
                    />
                    <Route
                        path="reset-password/:token"
                        element={<ResetPassword />}
                    />
                    <Route path="/" element={<Home />} />
                    <Route path="/:blogtitle/:id" element={<Blog />} />
                    <Route
                        path="/author/:authorname/:authorId"
                        element={<Author />}
                    />

                    <Route
                        path="/new-blog"
                        element={
                            <ProtectedRoute>
                                <NewBlog />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/edit/:blogtitle/:blogId"
                        element={
                            <ProtectedRoute>
                                <EditBlog />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/archived-blogs"
                        element={
                            <ProtectedRoute>
                                <Archived />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/library"
                        element={
                            <ProtectedRoute>
                                <Library />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </HelmetProvider>
    );
}

export default App;
