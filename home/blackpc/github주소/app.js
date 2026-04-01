// Dummy Data
const posts = [
    {
        id: 1,
        title: "혁신적인 웹 프론트엔드 디자인 트렌드: Glassmorphism 정복하기",
        excerpt: "투명하고 유려한 디자인이 어떻게 사용자 경험을 극대화하는지 알아보고 실제 코드에 적용해 봅니다.",
        content: `
            <p>최근 웹 디자인 트렌드에서 가장 두드러지는 요소는 바로 'Glassmorphism(글래스모피즘)'입니다. 배경을 흐리게 처리하면서도 투명한 유리 질감을 살려 요소간의 깊이감을 표현해 냅니다.</p>
            <p>이는 단순히 시각적 아름다움을 넘어, 정보 계층을 자연스럽게 구분짓는 강력한 도구입니다. CSS의 <code>backdrop-filter</code> 속성을 활용하면 누구나 쉽게 구현할 수 있습니다.</p>
            <p>블랙 다크 모드와 결합되었을 때 그 시너지는 배가 됩니다. 빛나는 네온 액센트와 반투명한 카드가 만나면 미래지향적이고 고급스러운 느낌을 한눈에 전달할 수 있습니다.</p>
        `,
        category: "Design",
        date: "2026. 04. 01",
        author: "BlackPC"
    },
    {
        id: 2,
        title: "효율적인 블로그 라우팅 설계와 바닐라 자바스크립트의 역습",
        excerpt: "무거운 프레임워크 없이도 모던하고 부드러운 SPA 경험을 제공하는 간단한 라우팅 기법.",
        content: `
            <p>React나 Vue와 같은 강력한 프레임워크 없이도 훌륭한 웹 애플리케이션을 만들 수 있을까요? 정답은 '예' 입니다.</p>
            <p>최신 바닐라 자바스크립트(ES6+)는 이미 충분히 강력하며, 간단한 DOM 조작만으로도 블로그 정도의 애플리케이션을 훌륭하게 구동할 수 있게 해줍니다.</p>
            <p>우리는 브라우저의 URL Search Params를 활용해 포스트 ID를 판별하고, 동적으로 데이터를 주입하는 방식을 채택했습니다. 이 덕분에 복잡한 빌드 체인 없이도 즉각적인 렌더링이 가능합니다.</p>
        `,
        category: "Development",
        date: "2026. 03. 28",
        author: "BlackPC"
    },
    {
        id: 3,
        title: "개발자의 생산성 도구: 완벽한 터미널 환경 세팅",
        excerpt: "작업 효율을 200% 올려주는 필수 개발 환경 구성과 꿀팁을 대방출합니다.",
        content: `
            <p>CLI(Command Line Interface) 환경은 진정한 개발자들의 놀이터입니다. 제대로 세팅된 터미널 환경은 개발 속도를 비약적으로 높여줍니다.</p>
            <p>이 포스트에서는 Zsh, Oh-my-zsh 플러그인 설정부터 고급 알리아스(Alias) 지정, 그리고 아름다운 터미널 테마 적용법까지 모두 다룹니다.</p>
        `,
        category: "Productivity",
        date: "2026. 03. 20",
        author: "BlackPC"
    }
];

// Execute when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    
    // Check which page we are on
    const params = new URLSearchParams(window.location.search);
    const postId = params.get('id');

    if (document.getElementById('post-list') && !postId) {
        renderPostList();
    } else if (document.getElementById('post-view') && postId) {
        renderSinglePost(parseInt(postId));
    }
});

// Theme Management
function initTheme() {
    const themeBtn = document.getElementById('theme-btn');
    const body = document.body;
    
    // Check local storage or defaults to dark
    const savedTheme = localStorage.getItem('blog-theme') || 'dark';
    
    if (savedTheme === 'light') {
        body.classList.remove('dark-theme');
        themeBtn.textContent = '🌙';
    } else {
        body.classList.add('dark-theme');
        themeBtn.textContent = '☀️';
    }

    themeBtn.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        
        if (body.classList.contains('dark-theme')) {
            localStorage.setItem('blog-theme', 'dark');
            themeBtn.textContent = '☀️';
        } else {
            localStorage.setItem('blog-theme', 'light');
            themeBtn.textContent = '🌙';
        }
    });
}

// Render the list of posts
function renderPostList() {
    const listContainer = document.getElementById('post-list');
    listContainer.innerHTML = '';

    posts.forEach((post, index) => {
        const delay = index * 0.1; // Staggered animation effect
        const postHTML = \`
            <article class="post-card glass" style="animation: float 1s ease-out \${delay}s; animation-fill-mode: both;">
                <span class="post-category">\${post.category}</span>
                <h3>\${post.title}</h3>
                <p>\${post.excerpt}</p>
                <div class="post-footer">
                    <span>\${post.date}</span>
                    <span>\${post.author}</span>
                </div>
                <!-- Interactive Overlay Link -->
                <a href="post.html?id=\${post.id}" style="position:absolute; top:0; left:0; width:100%; height:100%; z-index:1;" aria-label="\${post.title} 상세 보기"></a>
            </article>
        \`;
        listContainer.insertAdjacentHTML('beforeend', postHTML);
    });
}

// Render a single post view
function renderSinglePost(id) {
    const post = posts.find(p => p.id === id);
    
    if (!post) {
        document.getElementById('post-title').textContent = '포스트를 찾을 수 없습니다.';
        document.getElementById('post-category').textContent = 'ERROR';
        document.getElementById('post-body').innerHTML = '<p>요청하신 포스트가 존재하지 않거나 알 수 없는 오류가 발생했습니다.</p>';
        return;
    }

    document.getElementById('post-title').textContent = post.title;
    document.getElementById('post-category').textContent = post.category;
    document.getElementById('post-date').textContent = \`\${post.date} · \${post.author}\`;
    
    // Add fade-in animation to body
    const postBody = document.getElementById('post-body');
    postBody.innerHTML = post.content;
    postBody.style.opacity = 0;
    
    setTimeout(() => {
        postBody.style.transition = "opacity 0.8s ease-in-out";
        postBody.style.opacity = 1;
    }, 100);
}
