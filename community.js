const KEY='fametrack-community-topics';
const escapeHTML=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const readTopics=()=>{try{const value=JSON.parse(localStorage.getItem(KEY)||'[]');return Array.isArray(value)?value:[]}catch{return[]}};
let topics=readTopics();
const list=document.getElementById('topics');
const status=document.getElementById('community-status');
document.getElementById('year').textContent=new Date().getFullYear();
function render(){
  topics=readTopics().sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));
  list.innerHTML=topics.length?topics.map(topic=>`<article class="topic-card" data-topic="${escapeHTML(topic.id)}">
    <div class="topic-meta"><span class="tag">${escapeHTML(topic.category)}</span><time>${escapeHTML(new Date(topic.createdAt).toLocaleString())}</time></div>
    <h3>${escapeHTML(topic.title)}</h3><p class="topic-copy">${escapeHTML(topic.message)}</p>
    <div class="reply-list"><strong>${topic.replies.length} ${topic.replies.length===1?'reply':'replies'}</strong>
      ${topic.replies.map(reply=>`<div class="reply"><time class="status">${escapeHTML(new Date(reply.createdAt).toLocaleString())}</time><p>${escapeHTML(reply.message)}</p></div>`).join('')}
    </div>
    <form class="reply-form"><label class="hidden" for="reply-${escapeHTML(topic.id)}">Write a reply</label><input id="reply-${escapeHTML(topic.id)}" name="message" required maxlength="500" placeholder="Add to the conversation…"><button class="btn" type="submit">Reply</button></form>
    <div style="text-align:right;margin-top:10px"><button class="topic-delete" type="button" data-delete="${escapeHTML(topic.id)}">Delete this topic</button></div>
  </article>`).join(''):'<p class="empty">No topics yet. Start the first conversation!</p>';
}
document.getElementById('topic-form').addEventListener('submit',event=>{
  event.preventDefault();
  const title=document.getElementById('topic-title').value.trim(),message=document.getElementById('topic-message').value.trim();
  if(!title||!message)return;
  topics.push({id:`topic-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,title,message,category:document.getElementById('topic-category').value,createdAt:new Date().toISOString(),replies:[]});
  localStorage.setItem(KEY,JSON.stringify(topics));event.currentTarget.reset();status.textContent='Topic posted in this browser.';render();
});
list.addEventListener('submit',event=>{
  const form=event.target.closest('.reply-form');if(!form)return;
  event.preventDefault();const card=form.closest('[data-topic]'),topic=topics.find(item=>item.id===card.dataset.topic),message=new FormData(form).get('message')?.toString().trim();
  if(!topic||!message)return;
  topic.replies.push({message,createdAt:new Date().toISOString()});localStorage.setItem(KEY,JSON.stringify(topics));render();
});
list.addEventListener('click',event=>{
  const button=event.target.closest('[data-delete]');if(!button)return;
  topics=topics.filter(item=>item.id!==button.dataset.delete);localStorage.setItem(KEY,JSON.stringify(topics));render();
});
render();
