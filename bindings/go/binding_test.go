package tree_sitter_garnet_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_garnet "github.com/ark231/garnet/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_garnet.Language())
	if language == nil {
		t.Errorf("Error loading Garnet grammar")
	}
}
