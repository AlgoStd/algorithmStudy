#include <string>
#include <vector>
#include <algorithm>
#include <queue>

using namespace std;

void bfs(int pipe, vector<bool>& visited, vector<vector<vector<int>>>& graph) {
    queue<int> q;
    
    for (int i=1; i<visited.size(); i++) {
        if (visited[i]) {
            q.push(i);
        }
    }
    
    while (!q.empty()) {
        int curr_node = q.front();
        q.pop();
        
        for (int next_node : graph[pipe][curr_node]) {
            
            if (visited[next_node]) continue;
            
            q.push(next_node);
            visited[next_node] = true;
        }
    }
    
    return;
}

void dfs(int current_turn, int max_turn, vector<bool> visited, vector<vector<vector<int>>>& graph, int& max_infected_nodes) {
    if (current_turn == max_turn) {
        int infected_nodes = count(visited.begin(), visited.end(), true);
        max_infected_nodes = max(infected_nodes, max_infected_nodes);
        return;
    }
    
    for (int pipe=1; pipe<=3; pipe++) {
        vector<bool> next_visited = visited;
        
        bfs(pipe, next_visited, graph);
        dfs(current_turn + 1, max_turn, next_visited, graph, max_infected_nodes);
    }
}

int solution(int n, int infection, vector<vector<int>> edges, int k) {
    int max_infected_nodes = 0;
    vector<vector<vector<int>>> graph(4, vector<vector<int>>(n+1));
    vector<bool> visited(n+1, false);
    
    for (const auto& edge : edges) {
        int u = edge[0];
        int v = edge[1];
        int pipe_type = edge[2];
        
        graph[pipe_type][u].push_back(v);
        graph[pipe_type][v].push_back(u);
    }
    
    visited[infection] = true;
    
    dfs(0, k, visited, graph, max_infected_nodes);
    
    return max_infected_nodes;
}